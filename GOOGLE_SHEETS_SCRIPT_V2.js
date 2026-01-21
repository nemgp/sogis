/**
 * SOGIS - Google Apps Script pour API Web (Version 2 - CORS amélioré)
 * 
 * Ce script doit être copié dans Google Apps Script et déployé comme Web App
 * 
 * Instructions :
 * 1. Ouvrir votre Google Sheet "SOGIS Database"
 * 2. Extensions > Apps Script
 * 3. Copier ce code
 * 4. Déployer > Gérer les déploiements > Modifier le déploiement existant
 * 5. Nouvelle version > Déployer
 */

// Noms des feuilles
const SHEET_REQUESTS = 'Demandes';
const SHEET_COMMENTS = 'Commentaires';

/**
 * Point d'entrée pour les requêtes POST
 */
function doPost(e) {
    try {
        const params = JSON.parse(e.postData.contents);
        const action = params.action;

        let result;

        switch (action) {
            case 'addRequest':
                result = addRequest(params.data);
                break;
            case 'addComment':
                result = addComment(params.data);
                break;
            case 'updateRequestStatus':
                result = updateRequestStatus(params.ticketId, params.status);
                break;
            case 'deleteRequest':
                result = deleteRequest(params.ticketId);
                break;
            case 'validateComment':
                result = validateComment(params.id);
                break;
            case 'rejectComment':
                result = rejectComment(params.id);
                break;
            default:
                return createResponse(false, 'Action inconnue');
        }

        return createResponse(true, 'Succès', result);
    } catch (error) {
        return createResponse(false, error.toString());
    }
}

/**
 * Point d'entrée pour les requêtes GET
 */
function doGet(e) {
    try {
        const action = e.parameter.action;

        let result;

        switch (action) {
            case 'getRequests':
                result = getRequests(e.parameter.filter);
                break;
            case 'getComments':
                result = getComments(e.parameter.filter);
                break;
            case 'getRequestByTicket':
                result = getRequestByTicket(e.parameter.ticketId);
                break;
            default:
                return createResponse(false, 'Action inconnue');
        }

        return createResponse(true, 'Succès', result);
    } catch (error) {
        return createResponse(false, error.toString());
    }
}

/**
 * Ajouter une demande
 */
function addRequest(data) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);

    const row = [
        data.ticketId,
        new Date().toISOString(),
        data.name,
        data.email,
        data.phone,
        data.service,
        data.message,
        data.serviceType,
        'pending',
        JSON.stringify([{ status: 'pending', timestamp: new Date().toISOString() }])
    ];

    sheet.appendRow(row);

    return { ticketId: data.ticketId };
}

/**
 * Récupérer les demandes
 */
function getRequests(filter) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);
    const data = sheet.getDataRange().getValues();

    // Ignorer la ligne d'en-tête
    const requests = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];

        // Filtrer si nécessaire
        if (filter && filter !== 'all') {
            if (row[7] !== filter) continue; // serviceType
        }

        requests.push({
            ticketId: row[0],
            timestamp: row[1],
            name: row[2],
            email: row[3],
            phone: row[4],
            service: row[5],
            message: row[6],
            serviceType: row[7],
            status: row[8],
            statusHistory: JSON.parse(row[9] || '[]')
        });
    }

    return requests;
}

/**
 * Récupérer une demande par ticket ID
 */
function getRequestByTicket(ticketId) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] === ticketId) {
            return {
                ticketId: row[0],
                timestamp: row[1],
                name: row[2],
                email: row[3],
                phone: row[4],
                service: row[5],
                message: row[6],
                serviceType: row[7],
                status: row[8],
                statusHistory: JSON.parse(row[9] || '[]')
            };
        }
    }

    return null;
}

/**
 * Mettre à jour le statut d'une demande
 */
function updateRequestStatus(ticketId, newStatus) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] === ticketId) {
            // Mettre à jour le statut
            sheet.getRange(i + 1, 9).setValue(newStatus);

            // Ajouter à l'historique
            const history = JSON.parse(row[9] || '[]');
            history.push({
                status: newStatus,
                timestamp: new Date().toISOString()
            });
            sheet.getRange(i + 1, 10).setValue(JSON.stringify(history));

            return { success: true };
        }
    }

    return { success: false, error: 'Demande non trouvée' };
}

/**
 * Supprimer une demande
 */
function deleteRequest(ticketId) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] === ticketId) {
            sheet.deleteRow(i + 1);
            return { success: true };
        }
    }

    return { success: false, error: 'Demande non trouvée' };
}

/**
 * Ajouter un commentaire
 */
function addComment(data) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_COMMENTS);

    // Générer un ID unique
    const id = new Date().getTime().toString();

    const row = [
        id,
        new Date().toISOString(),
        data.name,
        data.email,
        data.rating,
        data.comment,
        data.serviceType,
        'pending'
    ];

    sheet.appendRow(row);

    return { id: id };
}

/**
 * Récupérer les commentaires
 */
function getComments(filter) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_COMMENTS);
    const data = sheet.getDataRange().getValues();

    const comments = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];

        // Filtrer par statut ou type si nécessaire
        if (filter === 'pending' && row[7] !== 'pending') continue;
        if (filter === 'validated' && row[7] !== 'validated') continue;
        if (filter === 'business' && row[6] !== 'business') continue;
        if (filter === 'services' && row[6] !== 'services') continue;

        comments.push({
            id: row[0],
            timestamp: row[1],
            name: row[2],
            email: row[3],
            rating: row[4],
            comment: row[5],
            serviceType: row[6],
            status: row[7]
        });
    }

    return comments;
}

/**
 * Valider un commentaire
 */
function validateComment(id) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_COMMENTS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] === id) {
            sheet.getRange(i + 1, 8).setValue('validated');
            return { success: true };
        }
    }

    return { success: false, error: 'Commentaire non trouvé' };
}

/**
 * Rejeter un commentaire
 */
function rejectComment(id) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_COMMENTS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[0] === id) {
            sheet.deleteRow(i + 1);
            return { success: true };
        }
    }

    return { success: false, error: 'Commentaire non trouvé' };
}

/**
 * Créer une réponse JSON avec en-têtes CORS
 */
function createResponse(success, message, data) {
    const response = {
        success: success,
        message: message,
        data: data || null
    };

    const output = ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);

    return output;
}
