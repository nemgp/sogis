import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);

    useEffect(() => {
        // Vérifier la session initiale
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        // Écouter les changements de session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // En attente de la vérification
    if (session === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500" />
            </div>
        );
    }

    // Non authentifié → redirection vers login
    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};
