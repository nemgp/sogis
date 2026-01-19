import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Tracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [searchResult, setSearchResult] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingId.trim()) {
            setSearchResult({ error: 'Veuillez entrer un numéro de suivi' });
            return;
        }

        // Mock status based on ID pattern
        const mockStatus = {
            id: trackingId,
            status: 'in_progress',
            title: 'Demande de financement',
            date: new Date().toLocaleDateString('fr-FR'),
            updates: [
                { date: '18/01/2026', message: 'Dossier reçu et en cours d\'analyse', status: 'completed' },
                { date: '19/01/2026', message: 'Vérification des documents', status: 'in_progress' },
                { date: '22/01/2026', message: 'Décision finale', status: 'pending' },
            ]
        };

        setSearchResult(mockStatus);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="text-green-500" size={20} />;
            case 'in_progress': return <Clock className="text-blue-500" size={20} />;
            case 'pending': return <AlertCircle className="text-slate-300" size={20} />;
            default: return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-slate-800">Suivre mon Dossier</h1>
                <p className="text-xl text-slate-600">
                    Entrez votre numéro de suivi pour consulter l'état de votre demande.
                </p>
            </div>

            <GlassCard className="p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Numéro de suivi
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                placeholder="Ex: SOG-2026-X9Y2"
                                className="flex-1 rounded-xl bg-white/50 border border-white/60 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50 placeholder:text-slate-400"
                            />
                            <button type="submit" className="btn-primary flex items-center gap-2 px-6">
                                <Search size={20} />
                                Rechercher
                            </button>
                        </div>
                    </div>
                </form>

                {searchResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-8 border-t border-white/40"
                    >
                        {searchResult.error ? (
                            <div className="text-center text-red-500 font-medium">
                                {searchResult.error}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">{searchResult.title}</h3>
                                        <p className="text-sm text-slate-500">ID: {searchResult.id}</p>
                                    </div>
                                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                                        En cours
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-700">Historique</h4>
                                    {searchResult.updates.map((update: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="mt-1">{getStatusIcon(update.status)}</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-slate-800 font-medium">{update.message}</p>
                                                    <span className="text-xs text-slate-500">{update.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/40">
                                    <p className="text-sm text-slate-600">
                                        💡 Vous recevrez une notification par email à chaque mise à jour de votre dossier.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-sogis-business/10 to-sogis-services/10 border-l-4 border-l-sogis-business">
                <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-lg">Vous n'avez pas encore de numéro de suivi ?</h3>
                    <p className="text-slate-600">
                        Soumettez une demande via nos modules <Link to="/business" className="text-sogis-business font-semibold underline">Business</Link> ou <Link to="/services" className="text-sogis-services font-semibold underline">Services</Link> pour obtenir votre numéro de suivi.
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};
