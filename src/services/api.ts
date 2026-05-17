/**
 * Service API pour interagir avec Supabase
 * Remplace l'ancienne intégration Google Sheets/Apps Script
 */

import { supabase } from '../lib/supabase';

// ─────────────────────────────────────────────
// Types (interface identique à l'ancienne API)
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Helpers de mapping DB ↔ TypeScript
// ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRequest(row: any): Request {
    return {
        ticketId: row.ticket_id,
        timestamp: row.created_at,
        name: row.name,
        email: row.email,
        phone: row.phone ?? '',
        service: row.service,
        message: row.message,
        serviceType: row.service_type,
        status: row.status,
        statusHistory: row.status_history ?? [],
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapComment(row: any): Comment {
    return {
        id: row.id,
        timestamp: row.created_at,
        name: row.name,
        email: row.email,
        rating: row.rating,
        comment: row.comment,
        serviceType: row.service_type,
        status: row.status,
    };
}

// ─────────────────────────────────────────────
// Demandes
// ─────────────────────────────────────────────

/** Soumettre une nouvelle demande */
export async function submitRequest(
    data: Omit<Request, 'timestamp' | 'status' | 'statusHistory'>
): Promise<{ ticketId: string }> {
    const { error } = await supabase.from('requests').insert({
        ticket_id: data.ticketId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        service_type: data.serviceType,
        status: 'pending',
        status_history: [],
    });

    if (error) throw new Error(error.message);
    return { ticketId: data.ticketId };
}

/** Récupérer toutes les demandes */
export async function fetchRequests(
    filter: 'all' | 'business' | 'services' = 'all'
): Promise<Request[]> {
    let query = supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

    if (filter !== 'all') {
        query = query.eq('service_type', filter);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRequest);
}

/** Récupérer une demande par ticket ID */
export async function fetchRequestByTicket(ticketId: string): Promise<Request | null> {
    const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('ticket_id', ticketId)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? mapRequest(data) : null;
}

/** Mettre à jour le statut d'une demande */
export async function updateRequestStatus(
    ticketId: string,
    status: Request['status']
): Promise<void> {
    // Récupérer l'historique actuel
    const { data: current, error: fetchError } = await supabase
        .from('requests')
        .select('status_history')
        .eq('ticket_id', ticketId)
        .single();

    if (fetchError) throw new Error(fetchError.message);

    const newHistory = [
        ...(current?.status_history ?? []),
        { status, timestamp: new Date().toISOString() },
    ];

    const { error } = await supabase
        .from('requests')
        .update({ status, status_history: newHistory })
        .eq('ticket_id', ticketId);

    if (error) throw new Error(error.message);
}

/** Supprimer une demande */
export async function deleteRequest(ticketId: string): Promise<void> {
    const { error } = await supabase
        .from('requests')
        .delete()
        .eq('ticket_id', ticketId);

    if (error) throw new Error(error.message);
}

// ─────────────────────────────────────────────
// Commentaires
// ─────────────────────────────────────────────

/** Soumettre un nouveau commentaire */
export async function submitComment(
    data: Omit<Comment, 'id' | 'timestamp' | 'status'>
): Promise<void> {
    const { error } = await supabase
        .from('comments')
        .insert({
            name: data.name,
            email: data.email,
            rating: data.rating,
            comment: data.comment,
            service_type: data.serviceType,
            status: 'pending',
        });

    if (error) throw new Error(error.message);
}

/** Récupérer les commentaires avec filtre */
export async function fetchComments(
    filter: 'all' | 'pending' | 'validated' | 'rejected' | 'business' | 'services' = 'all'
): Promise<Comment[]> {
    let query = supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (filter === 'pending' || filter === 'validated' || filter === 'rejected') {
        query = query.eq('status', filter);
    } else if (filter === 'business' || filter === 'services') {
        query = query.eq('service_type', filter);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapComment);
}

/** Valider un commentaire */
export async function validateComment(id: string): Promise<void> {
    const { error } = await supabase
        .from('comments')
        .update({ status: 'validated' })
        .eq('id', id);

    if (error) throw new Error(error.message);
}

/** Rejeter un commentaire */
export async function rejectComment(id: string): Promise<void> {
    const { error } = await supabase
        .from('comments')
        .update({ status: 'rejected' })
        .eq('id', id);

    if (error) throw new Error(error.message);
}

/** Supprimer définitivement un commentaire */
export async function deleteComment(id: string): Promise<void> {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
}

// ─────────────────────────────────────────────
// Export CSV
// ─────────────────────────────────────────────

/** Exporter les demandes en CSV */
export function exportToExcel(): void {
    // L'export est géré directement dans Admin.tsx avec les données déjà chargées
    console.log('Export CSV géré dans le composant Admin');
}
