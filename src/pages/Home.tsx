import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, PartyPopper, ArrowRight, MapPin, Phone, Mail, Users } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section with Services */}
            <div className="grid md:grid-cols-2 gap-6 min-h-[80vh] items-center">

                {/* Business Section */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="h-full"
                >
                    <GlassCard className="h-full flex flex-col justify-center items-start text-left min-h-[400px] border-l-4 border-l-sogis-business hover:bg-white/50 transition-colors group overflow-hidden relative">
                        {/* Background Image */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img
                                src="/sogis/happy-business.png"
                                alt="Business Success"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="p-4 rounded-2xl bg-sogis-business/10 text-sogis-business mb-6 group-hover:scale-110 transition-transform inline-block">
                                <Building2 size={48} />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">SOGIS Business</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-md">
                                Expertise en investissement, accompagnement juridique et opportunités d'affaires au Cameroun.
                                La rigueur institutionnelle pour vos projets.
                            </p>
                            <Link to="/business" className="flex items-center gap-2 text-sogis-business font-semibold text-lg hover:gap-4 transition-all">
                                Accéder à l'espace Business <ArrowRight size={20} />
                            </Link>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Services Section */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-full"
                >
                    <GlassCard className="h-full flex flex-col justify-center items-start text-left min-h-[400px] border-l-4 border-l-sogis-services hover:bg-white/50 transition-colors group overflow-hidden relative">
                        {/* Background Image */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img
                                src="/sogis/happy-event.png"
                                alt="Event Success"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="p-4 rounded-2xl bg-sogis-services/10 text-sogis-services mb-6 group-hover:scale-110 transition-transform inline-block">
                                <PartyPopper size={48} />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">SOGIS Services</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-md">
                                Logistique événementielle, personnel qualifié et services à la demande au Cameroun.
                                Flexibilité et dynamisme pour vos événements.
                            </p>
                            <Link to="/services" className="flex items-center gap-2 text-sogis-services font-semibold text-lg hover:gap-4 transition-all">
                                Accéder à l'espace Services <ArrowRight size={20} />
                            </Link>
                        </div>
                    </GlassCard>
                </motion.div>

            </div>

            {/* About Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-5xl font-heading font-bold text-slate-800">À Propos de SOGIS</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Votre partenaire de confiance pour le développement d'affaires et l'organisation d'événements au Cameroun
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Company Description */}
                    <GlassCard className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-sogis-business/10 text-sogis-business">
                                <Users size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Qui sommes-nous ?</h3>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <p>
                                <strong className="text-slate-800">SOGIS</strong> est une entreprise camerounaise spécialisée dans deux domaines complémentaires :
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-sogis-business mt-1">•</span>
                                    <span><strong>Business & Finance</strong> : Accompagnement dans vos projets d'investissement, conseil juridique, et opportunités d'affaires au Cameroun</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-sogis-services mt-1">•</span>
                                    <span><strong>Services & Events</strong> : Organisation événementielle complète, traiteur, sécurité, et personnel qualifié pour tous vos événements</span>
                                </li>
                            </ul>
                            <p>
                                Notre équipe expérimentée met son expertise au service de vos projets, avec la rigueur et le professionnalisme qui nous caractérisent.
                            </p>
                        </div>

                        {/* Team Image */}
                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/sogis/team-cameroon.png"
                                alt="Notre équipe SOGIS au Cameroun"
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    </GlassCard>

                    {/* Navigation & Contact Guide */}
                    <GlassCard className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-sogis-services/10 text-sogis-services">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Comment nous contacter ?</h3>
                        </div>

                        <div className="space-y-6 text-slate-600">
                            <div className="space-y-3">
                                <h4 className="font-bold text-slate-800 text-lg">Navigation sur le site</h4>
                                <ul className="space-y-2 ml-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-business mt-1">→</span>
                                        <span><strong>Business</strong> : Découvrez nos services de financement, conseil juridique et suivi de chantier</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-services mt-1">→</span>
                                        <span><strong>Services</strong> : Explorez nos prestations événementielles et services à la demande</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400 mt-1">→</span>
                                        <span><strong>Suivi</strong> : Suivez l'évolution de votre dossier avec votre numéro de tracking</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-slate-800 text-lg">Démarrer un projet</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                        <span className="text-2xl">1️⃣</span>
                                        <div>
                                            <p className="font-semibold text-slate-800">Choisissez votre service</p>
                                            <p className="text-sm">Visitez la page Business ou Services selon votre besoin</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                        <span className="text-2xl">2️⃣</span>
                                        <div>
                                            <p className="font-semibold text-slate-800">Remplissez le formulaire</p>
                                            <p className="text-sm">Décrivez votre projet en détail</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                        <span className="text-2xl">3️⃣</span>
                                        <div>
                                            <p className="font-semibold text-slate-800">Recevez votre numéro de suivi</p>
                                            <p className="text-sm">Un conseiller vous contactera sous 48h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/40 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin size={16} className="text-sogis-business" />
                                    <span><strong>Localisation :</strong> Cameroun</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone size={16} className="text-sogis-business" />
                                    <span><strong>Disponibilité :</strong> Lun-Ven 8h-18h</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail size={16} className="text-sogis-business" />
                                    <span><strong>Réponse :</strong> Sous 48h maximum</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* CTA Section */}
                <GlassCard className="bg-gradient-to-r from-sogis-business/10 via-white/30 to-sogis-services/10 border-2 border-white/60">
                    <div className="text-center space-y-6 py-8">
                        <h3 className="text-3xl font-bold text-slate-800">
                            Prêt à démarrer votre projet au Cameroun ?
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Que ce soit pour un investissement, un conseil juridique ou l'organisation d'un événement, notre équipe est là pour vous accompagner.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link to="/business" className="btn-primary">
                                Démarrer un projet Business
                            </Link>
                            <Link to="/services" className="btn-secondary">
                                Organiser un événement
                            </Link>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};
