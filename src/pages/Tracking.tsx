import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchRequestByTicket, type Request } from '../services/googleSheetsAPI';

export const Tracking = () => {
    const { t } = useLanguage();
    const [trackingId, setTrackingId] = useState('');
    const [searchResult, setSearchResult] = useState<Request | null | { error: string }>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingId.trim()) {
            setSearchResult({ error: t('tracking.error.empty') });
            return;
        }

        try {
            setLoading(true);
            const result = await fetchRequestByTicket(trackingId.trim());

            if (result) {
                setSearchResult(result);
            } else {
                setSearchResult({ error: 'Numéro de suivi introuvable' });
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setSearchResult({ error: 'Erreur lors de la recherche. Veuillez réessayer.' });
        } finally {
            setLoading(false);
        }
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
                <h1 className="text-5xl font-heading font-bold text-slate-800">{t('tracking.title')}</h1>
                <p className="text-xl text-slate-600">
                    {t('tracking.subtitle')}
                </p>
            </div>

            <GlassCard className="p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('tracking.placeholder')}
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                placeholder="Ex: SOG-2026-X9Y2"
                                className="flex-1 rounded-xl bg-white/50 border border-white/60 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50 placeholder:text-slate-400"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <Search size={20} />
                                )}
                                {t('tracking.button')}
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
                        {'error' in searchResult ? (
                            <div className="text-center text-red-500 font-medium">
                                {searchResult.error}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">{(searchResult as Request).service}</h3>
                                        <p className="text-sm text-slate-500">ID: {(searchResult as Request).ticketId}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${(searchResult as Request).status === 'completed' ? 'bg-green-100 text-green-700' :
                                        (searchResult as Request).status === 'inprogress' ? 'bg-blue-100 text-blue-700' :
                                            (searchResult as Request).status === 'accepted' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-slate-100 text-slate-700'
                                        }`}>
                                        {(searchResult as Request).status === 'completed' ? 'Finalisé' :
                                            (searchResult as Request).status === 'inprogress' ? 'En cours' :
                                                (searchResult as Request).status === 'accepted' ? 'Accepté' : 'En attente'}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-700">{t('tracking.history.title')}</h4>
                                    {(searchResult as Request).statusHistory.map((update, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="mt-1">{getStatusIcon(update.status)}</div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-slate-800 font-medium">
                                                        {update.status === 'completed' ? 'Finalisé' :
                                                            update.status === 'inprogress' ? 'En cours' :
                                                                update.status === 'accepted' ? 'Accepté' : 'En attente'}
                                                    </p>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(update.timestamp).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/40">
                                    <p className="text-sm text-slate-600">
                                        {t('tracking.notification')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-sogis-business/10 to-sogis-services/10 border-l-4 border-l-sogis-business">
                <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-lg">{t('tracking.notracking.title')}</h3>
                    <p className="text-slate-600">
                        {t('tracking.notracking.message')} <Link to="/business" className="text-sogis-business font-semibold underline">{t('tracking.notracking.business')}</Link> {t('nav.or')} <Link to="/services" className="text-sogis-services font-semibold underline">{t('tracking.notracking.services')}</Link> {t('tracking.notracking.suffix')}
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};
