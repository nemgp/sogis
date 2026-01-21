/**
 * Service API pour interagir avec Google Sheets
 * 
 * Ce service gère toutes les communications avec l'API Google Sheets
 * déployée via Apps Script
 */

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;

if (!API_URL) {
    console.warn('⚠️ VITE_GOOGLE_SHEETS_API_URL n\'est pas défini dans .env');
}

export interface Request {
    ticketId: string;
    timestamp: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    serviceType: 'business' | 'services';
    status: 'pending' | 'accepted' | 'inprogress' | 'completed';
    statusHistory: Array<{
        status: string;
        timestamp: string;
    }>;
}

export interface Comment {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    serviceType: 'business' | 'services';
    status: 'pending' | 'validated' | 'rejected';
}

interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

/**
 * Soumettre une nouvelle demande
 */
export async function submitRequest(data: Omit<Request, 'timestamp' | 'status' | 'statusHistory'>): Promise<{ ticketId: string }> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'addRequest',
            ticketId: data.ticketId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            serviceType: data.serviceType
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<{ ticketId: string }> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data!;
    } catch (error) {
        console.error('Erreur lors de la soumission de la demande:', error);
        throw error;
    }
}

/**
 * Soumettre un nouveau commentaire
 */
export async function submitComment(data: Omit<Comment, 'id' | 'timestamp' | 'status'>): Promise<{ id: string }> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'addComment',
            name: data.name,
            email: data.email,
            rating: data.rating.toString(),
            comment: data.comment,
            serviceType: data.serviceType
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<{ id: string }> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data!;
    } catch (error) {
        console.error('Erreur lors de la soumission du commentaire:', error);
        throw error;
    }
}

/**
 * Récupérer toutes les demandes
 */
export async function fetchRequests(filter: 'all' | 'business' | 'services' = 'all'): Promise<Request[]> {
    try {
        const url = `${API_URL}?action=getRequests&filter=${filter}`;
        const response = await fetch(url);
        const result: APIResponse<Request[]> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw error;
    }
}

/**
 * Récupérer une demande par ticket ID
 */
export async function fetchRequestByTicket(ticketId: string): Promise<Request | null> {
    try {
        const url = `${API_URL}?action=getRequestByTicket&ticketId=${encodeURIComponent(ticketId)}`;
        const response = await fetch(url);
        const result: APIResponse<Request> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la demande:', error);
        throw error;
    }
}

/**
 * Récupérer tous les commentaires
 */
export async function fetchComments(filter: 'all' | 'pending' | 'validated' | 'business' | 'services' = 'all'): Promise<Comment[]> {
    try {
        const url = `${API_URL}?action=getComments&filter=${filter}`;
        const response = await fetch(url);
        const result: APIResponse<Comment[]> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error;
    }
}

/**
 * Mettre à jour le statut d'une demande
 */
export async function updateRequestStatus(ticketId: string, status: Request['status']): Promise<void> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'updateRequestStatus',
            ticketId: ticketId,
            status: status
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        throw error;
    }
}

/**
 * Supprimer une demande
 */
export async function deleteRequest(ticketId: string): Promise<void> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'deleteRequest',
            ticketId: ticketId
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la demande:', error);
        throw error;
    }
}

/**
 * Valider un commentaire
 */
export async function validateComment(id: string): Promise<void> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'validateComment',
            id: id
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la validation du commentaire:', error);
        throw error;
    }
}

/**
 * Rejeter un commentaire
 */
export async function rejectComment(id: string): Promise<void> {
    try {
        // Utiliser GET avec paramètres URL pour contourner CORS
        const params = new URLSearchParams({
            action: 'rejectComment',
            id: id
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors du rejet du commentaire:', error);
        throw error;
    }
}

/**
 * Exporter les demandes en Excel
 * Cette fonction télécharge directement le Google Sheet en format Excel
 */
export function exportToExcel(): void {
    // Pour exporter, on ouvre directement le Google Sheet
    // L'utilisateur peut ensuite faire Fichier > Télécharger > Excel
    const sheetId = extractSheetIdFromUrl(API_URL);
    if (sheetId) {
        const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
        window.open(exportUrl, '_blank');
    } else {
        alert('Impossible d\'exporter : ID du Google Sheet non trouvé');
    }
}

/**
 * Extraire l'ID du Google Sheet depuis l'URL de l'API
 */
function extractSheetIdFromUrl(url: string): string | null {
    // L'URL Apps Script contient l'ID du script, pas du sheet
    // On va donc demander à l'utilisateur de configurer l'ID manuellement
    // ou on peut le stocker dans une variable d'environnement
    const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
    return sheetId || null;
}
