import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ContactFormProps {
    serviceType: 'business' | 'services';
}

export const ContactForm = ({ serviceType }: ContactFormProps) => {
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
                    <h3 className="text-2xl font-bold text-slate-800">Demande enregistrée !</h3>
                    <p className="text-slate-600">
                        Votre demande a été transmise avec succès. Un conseiller vous contactera sous 48h.
                    </p>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border-2 border-dashed border-sogis-business/30">
                    <p className="text-sm font-medium text-slate-600 mb-2">Votre numéro de suivi :</p>
                    <p className="text-3xl font-bold text-sogis-business font-mono tracking-wider">
                        {ticketId}
                    </p>
                    <p className="text-xs text-slate-500 mt-3">
                        💾 Conservez ce numéro pour suivre l'évolution de votre dossier
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Link to="/tracking" className="btn-primary">
                        Suivre mon dossier
                    </Link>
                    <button onClick={handleReset} className="btn-secondary">
                        Nouvelle demande
                    </button>
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Contactez-nous</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                    <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service demandé</label>
                    <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50"
                    >
                        <option value="">Sélectionnez...</option>
                        {serviceType === 'business' ? (
                            <>
                                <option>Demande de financement</option>
                                <option>Conseil juridique</option>
                                <option>Suivi de chantier</option>
                                <option>Opportunité d'investissement</option>
                            </>
                        ) : (
                            <>
                                <option>Réservation traiteur</option>
                                <option>Service sécurité</option>
                                <option>Hôtesses d'accueil</option>
                                <option>Devis événementiel</option>
                            </>
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-business/50 resize-none"
                        placeholder="Décrivez votre besoin..."
                    />
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                    <Send size={20} />
                    Envoyer la demande
                </button>
            </form>
        </GlassCard>
    );
};
