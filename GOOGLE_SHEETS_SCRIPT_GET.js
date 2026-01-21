/**
 * SOGIS - Google Apps Script pour API Web (Version GET - Sans CORS)
 * 
 * Ce script utilise uniquement GET pour éviter les problèmes CORS
 * 
 * Instructions :
 * 1. Ouvrir votre Google Sheet "SOGIS Database"
 * 2. Extensions > Apps Script
 * 3. Remplacer TOUT le code par celui-ci
 * 4. Enregistrer (Ctrl+S)
 * 5. Déployer > Gérer les déploiements > Modifier > Nouvelle version > Déployer
 */

// Noms des feuilles
const SHEET_REQUESTS = 'Demandes';
const SHEET_COMMENTS = 'Commentaires';

/**
 * Point d'entrée pour TOUTES les requêtes (GET uniquement)
 */
function doGet(e) {
    try {
        const action = e.parameter.action;

        let result;

        switch (action) {
            // Lecture
            case 'getRequests':
                result = getRequests(e.parameter.filter);
                break;
            case 'getComments':
                result = getComments(e.parameter.filter);
                break;
            case 'getRequestByTicket':
                result = getRequestByTicket(e.parameter.ticketId);
                break;

            // Écriture (via GET pour éviter CORS)
            case 'addRequest':
                result = addRequestViaGet(e.parameter);
                break;
            case 'addComment':
                result = addCommentViaGet(e.parameter);
                break;
            case 'updateRequestStatus':
                result = updateRequestStatus(e.parameter.ticketId, e.parameter.status);
                break;
            case 'deleteRequest':
                result = deleteRequest(e.parameter.ticketId);
                break;
            case 'validateComment':
                result = validateComment(e.parameter.id);
                break;
            case 'rejectComment':
                result = rejectComment(e.parameter.id);
                break;

            default:
                return createResponse(false, 'Action inconnue: ' + action);
        }

        return createResponse(true, 'Succès', result);
    } catch (error) {
        return createResponse(false, error.toString());
    }
}

/**
 * Ajouter une demande via GET
 */
function addRequestViaGet(params) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_REQUESTS);

    const row = [
        params.ticketId,
        new Date().toISOString(),
        params.name,
        params.email,
        params.phone,
        params.service,
        params.message,
        params.serviceType,
        'pending',
        JSON.stringify([{ status: 'pending', timestamp: new Date().toISOString() }])
    ];

    sheet.appendRow(row);

    return { ticketId: params.ticketId };
}

/**
 * Ajouter un commentaire via GET
 */
function addCommentViaGet(params) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_COMMENTS);

    // Générer un ID unique
    const id = new Date().getTime().toString();

    const row = [
        id,
        new Date().toISOString(),
        params.name,
        params.email,
        params.rating,
        params.comment,
        params.serviceType,
        'pending'
    ];

    sheet.appendRow(row);

    return { id: id };
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
 * Créer une réponse JSON
 */
function createResponse(success, message, data) {
    const response = {
        success: success,
        message: message,
        data: data || null
    };

    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}
