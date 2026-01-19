import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
    serviceType: 'business' | 'services';
}

export const ContactForm = ({ serviceType }: ContactFormProps) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [ticketId, setTicketId] = useState('');

    const generateTicketId = () => {
        const prefix = serviceType === 'business' ? 'BUS' : 'SRV';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `SOG-${prefix}-${timestamp}-${random}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicketId = generateTicketId();
        setTicketId(newTicketId);
        setSubmitted(true);

        // In a real app, this would send to a backend
        console.log('Form submitted:', { ...formData, ticketId: newTicketId });
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setSubmitted(false);
        setTicketId('');
    };

    // Get service options based on type
    const getServiceOptions = () => {
        const prefix = serviceType === 'business' ? 'form.business' : 'form.services';
        return Array.from({ length: 9 }, (_, i) => ({
            key: `${prefix}.option${i + 1}`,
            label: t(`${prefix}.option${i + 1}`)
        }));
    };

    if (submitted) {
        return (
            <GlassCard className="text-center space-y-6 bg-gradient-to-br from-green-50/50 to-white/30">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                >
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                </motion.div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-800">{t('form.success.title')}</h3>
                    <p className="text-slate-600">
                        {t('form.success.message')}
                    </p>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border-2 border-dashed border-sogis-business/30">
                    <p className="text-sm font-medium text-slate-600 mb-2">{t('form.success.tracking')}</p>
                    <p className="text-3xl font-bold text-sogis-business font-mono tracking-wider">
                        {ticketId}
                    </p>
                    <p className="text-xs text-slate-500 mt-3">
                        {t('form.success.note')}
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Link to="/tracking" className="btn-primary">
                        {t('form.success.track')}
                    </Link>
                    <button onClick={handleReset} className="btn-secondary">
                        {t('form.success.new')}
                    </button>
                </div>
            </GlassCard>
        );
    }

    const serviceOptions = getServiceOptions();

    return (
        <GlassCard>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('form.title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.label.name')}</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.label.email')}</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.label.phone')}</label>
                    <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.label.service')}</label>
                    <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                    >
                        <option value="">{t('form.placeholder.select')}</option>
                        {serviceOptions.map((option) => (
                            <option key={option.key} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('form.label.message')}</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50 resize-none"
                        placeholder={t('form.placeholder.message')}
                    />
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                    <Send size={20} />
                    {t('form.button.submit')}
                </button>
            </form>
        </GlassCard>
    );
};
