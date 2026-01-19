import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, HardHat, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';

export const Business = () => {
    const services = [
        {
            title: "Finance & Investissement",
            icon: TrendingUp,
            description: "Accès à des opportunités d'investissement vérifiées et rentables.",
            color: "text-blue-600"
        },
        {
            title: "Conseil Juridique",
            icon: Scale,
            description: "Création d'entreprise (GIC/SARL), conformité et rédaction de contrats.",
            color: "text-indigo-600"
        },
        {
            title: "Suivi de Chantier",
            icon: HardHat,
            description: "Supervision de vos projets immobiliers avec rapports photos hebdomadaires.",
            color: "text-cyan-600"
        }
    ];

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-sogis-business">Pôle Business</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Votre partenaire de confiance pour sécuriser vos investissements et vos projets au Cameroun.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <GlassCard key={idx} className="flex flex-col items-start gap-4 h-full">
                        <div className={`p-3 rounded-xl bg-white/50 ${service.color}`}>
                            <service.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
                        <p className="text-slate-600">{service.description}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Mock Investment Opportunities */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800">Opportunités à la Une</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="flex flex-col gap-4">
                        <div className="h-48 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 w-full flex items-center justify-center text-blue-300 font-bold text-lg">
                            [Image Projet Immobilier]
                        </div>
                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">Ouvert</span>
                            <h3 className="text-2xl font-bold text-slate-800">Résidence Les Palmiers</h3>
                            <p className="text-slate-600">Construction d'un complexe résidentiel de 12 appartements à Douala.</p>
                            <div className="flex justify-between items-center text-sm font-medium text-slate-500 pt-2 border-t border-slate-200/50">
                                <span>Rendement estimé: 12%</span>
                                <span>Ticket min: 1M FCFA</span>
                            </div>
                        </div>
                        <button className="btn-primary w-full mt-auto">Demander le dossier</button>
                    </GlassCard>

                    <GlassCard className="flex flex-col gap-4">
                        <div className="h-48 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 w-full flex items-center justify-center text-amber-300 font-bold text-lg">
                            [Image Projet Agricole]
                        </div>
                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">Ouvert</span>
                            <h3 className="text-2xl font-bold text-slate-800">Coopérative Cacao Bio</h3>
                            <p className="text-slate-600">Extension d'une plantation de cacao biologique et unité de séchage.</p>
                            <div className="flex justify-between items-center text-sm font-medium text-slate-500 pt-2 border-t border-slate-200/50">
                                <span>Rendement estimé: 18%</span>
                                <span>Ticket min: 500k FCFA</span>
                            </div>
                        </div>
                        <button className="btn-primary w-full mt-auto">Demander le dossier</button>
                    </GlassCard>
                </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800">Démarrer votre projet</h2>
                <ContactForm serviceType="business" />
            </div>
        </div>
    );
};
