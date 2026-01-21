import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { submitComment } from '../services/googleSheetsAPI';

interface CommentFormProps {
    pageType: 'business' | 'services';
}

export const CommentForm = ({ pageType }: CommentFormProps) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
        rating: 5
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Soumettre à Google Sheets
            await submitComment({
                name: formData.name,
                email: formData.email,
                rating: formData.rating,
                comment: formData.comment,
                serviceType: pageType
            });

            setSubmitted(true);
        } catch (err) {
            console.error('Erreur lors de la soumission du commentaire:', err);
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', comment: '', rating: 5 });
        setSubmitted(false);
        setError(null);
    };

    if (submitted) {
        return (
            <GlassCard className="text-center space-y-6 bg-gradient-to-br from-blue-50/50 to-white/30">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                >
                    <Mail className="w-20 h-20 text-blue-500 mx-auto" />
                </motion.div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-800">{t('comments.success.title')}</h3>
                    <p className="text-slate-600">
                        {t('comments.success.message')}
                    </p>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border-2 border-dashed border-blue-500/30">
                    <p className="text-sm text-slate-600">
                        📧 {t('comments.success.email')}
                    </p>
                </div>

                <button onClick={handleReset} className="btn-secondary">
                    {t('comments.success.new')}
                </button>
            </GlassCard>
        );
    }

    return (
        <GlassCard>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('comments.form.title')}</h3>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {t('comments.form.name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {t('comments.form.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t('comments.form.rating')}
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className="text-3xl transition-all hover:scale-110"
                            >
                                {star <= formData.rating ? '⭐' : '☆'}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t('comments.form.comment')}
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                        placeholder={t('comments.form.placeholder')}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Envoi en cours...</span>
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            {t('comments.form.submit')}
                        </>
                    )}
                </button>
            </form>
        </GlassCard>
    );
};
