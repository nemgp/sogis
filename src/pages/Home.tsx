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
                className="space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-5xl font-heading font-bold text-slate-800">À Propos de SOGIS SARL</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Votre partenaire de confiance pour le développement d'affaires et l'organisation d'événements au Cameroun
                    </p>
                </div>

                {/* Company Description */}
                <GlassCard className="bg-gradient-to-br from-sogis-business/5 to-sogis-services/5">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-sogis-business/10 text-sogis-business">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Qui sommes-nous ?</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                <strong className="text-slate-800">SOGIS SARL</strong> est une entreprise camerounaise spécialisée dans l'accompagnement des entreprises, TPE, PME, et particuliers. Nous offrons une gamme complète de services en <strong>Business & Finance</strong> ainsi qu'en <strong>Services & Événementiel</strong>.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Notre mission est de faciliter l'accès au financement pour les bayam sellam, boutiquiers, éleveurs, cultivateurs et commerçants, tout en assurant le succès de vos événements avec professionnalisme.
                            </p>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img
                                src="/sogis/team-cameroon.png"
                                alt="Notre équipe SOGIS au Cameroun"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* Activities Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-4xl font-heading font-bold text-sogis-business mb-2">Nos 9 Activités Business</h3>
                        <p className="text-lg text-slate-600">Accompagnement complet pour vos projets d'affaires au Cameroun</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">1</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Gestion des Dossiers Bancaires</h4>
                                    <p className="text-sm text-slate-600">
                                        Obtention de crédits, ouverture de comptes et recouvrements. Nous permettons aux entreprises, bayam sellam, boutiquiers, TPE et PME d'obtenir des financements. Éleveurs, cultivateurs, commerçants peuvent obtenir rapidement des financements via SOGIS SARL.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">2</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Montage de Projets</h4>
                                    <p className="text-sm text-slate-600">
                                        Création d'entreprises, GIC et coopératives. Nous accompagnons la structuration complète de votre projet.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">3</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Rédaction de Statuts</h4>
                                    <p className="text-sm text-slate-600">
                                        Rédaction des statuts et règlements des structures juridiques.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">4</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Courtier en Assurances</h4>
                                    <p className="text-sm text-slate-600">
                                        Courtage en assurances et gestion des sinistres.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">5</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Cabinet Conseil en Investissement</h4>
                                    <p className="text-sm text-slate-600">
                                        Accompagnement stratégique pour vos investissements.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">6</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Conseils Administratif et Juridiques</h4>
                                    <p className="text-sm text-slate-600">
                                        Expertise juridique et administrative pour vos démarches.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">7</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Investissement en Afrique</h4>
                                    <p className="text-sm text-slate-600">
                                        Opportunités d'investissement en Afrique avec focus Cameroun.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">8</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Négoce</h4>
                                    <p className="text-sm text-slate-600">
                                        Activités de commerce et négoce international.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">9</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Fiscalité</h4>
                                    <p className="text-sm text-slate-600">
                                        Conseil et accompagnement fiscal pour entreprises.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Services Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-4xl font-heading font-bold text-sogis-services mb-2">Nos 9 Services Événementiels</h3>
                        <p className="text-lg text-slate-600">Prestations complètes pour tous vos événements au Cameroun</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">A</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Service Traiteur</h4>
                                    <p className="text-sm text-slate-600">
                                        Restauration professionnelle pour tous types d'événements.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">B</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Service Café</h4>
                                    <p className="text-sm text-slate-600">
                                        Service café et rafraîchissements pour vos réceptions.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">C</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Rôtisserie pour Événement</h4>
                                    <p className="text-sm text-slate-600">
                                        Grillades et rôtisserie sur place pour vos célébrations.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">D</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Impresario Événementiel</h4>
                                    <p className="text-sm text-slate-600">
                                        Organisation complète d'événements heureux ou malheureux.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">E</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Contrôle des Chantiers</h4>
                                    <p className="text-sm text-slate-600">
                                        Supervision et suivi de vos projets de construction.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">F</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Hôtesses d'Accueil</h4>
                                    <p className="text-sm text-slate-600">
                                        Personnel d'accueil professionnel pour tous événements.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">G</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Bodyguard / Sécurité</h4>
                                    <p className="text-sm text-slate-600">
                                        Service de sécurité et protection pour vos événements.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">H</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Cuisinières / Cuisinier</h4>
                                    <p className="text-sm text-slate-600">
                                        Personnel de cuisine qualifié à votre disposition.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">I</span>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Production de Viandes Fumées</h4>
                                    <p className="text-sm text-slate-600">
                                        Spécialités de viandes fumées pour vos événements.
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* How to Contact Section */}
                <GlassCard className="bg-gradient-to-br from-white/40 to-white/20">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-sogis-services/10 text-sogis-services">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Comment nous contacter ?</h3>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-slate-800 text-lg">Navigation sur le site</h4>
                                <ul className="space-y-2 ml-4 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-business mt-1">→</span>
                                        <span><strong>Business</strong> : Découvrez nos 9 activités professionnelles</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-services mt-1">→</span>
                                        <span><strong>Services</strong> : Explorez nos 9 prestations événementielles</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400 mt-1">→</span>
                                        <span><strong>Suivi</strong> : Suivez votre dossier avec votre numéro</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-white/40 space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-sogis-business" />
                                    <span><strong>Localisation :</strong> Cameroun</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-sogis-business" />
                                    <span><strong>Disponibilité :</strong> Lun-Ven 8h-18h</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-sogis-business" />
                                    <span><strong>Réponse :</strong> Sous 48h maximum</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 text-lg">Démarrer un projet en 3 étapes</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">1️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">Choisissez votre service</p>
                                        <p className="text-sm text-slate-600">Visitez Business ou Services selon votre besoin</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">2️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">Remplissez le formulaire</p>
                                        <p className="text-sm text-slate-600">Décrivez votre projet en détail</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">3️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">Recevez votre numéro de suivi</p>
                                        <p className="text-sm text-slate-600">Un conseiller vous contactera sous 48h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* CTA Section */}
                <GlassCard className="bg-gradient-to-r from-sogis-business/10 via-white/30 to-sogis-services/10 border-2 border-white/60">
                    <div className="text-center space-y-6 py-8">
                        <h3 className="text-3xl font-bold text-slate-800">
                            Prêt à démarrer votre projet au Cameroun ?
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Que ce soit pour un financement, un conseil juridique ou l'organisation d'un événement, SOGIS SARL est là pour vous accompagner.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link to="/business" className="btn-primary">
                                Découvrir nos Activités Business
                            </Link>
                            <Link to="/services" className="btn-secondary">
                                Explorer nos Services
                            </Link>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};
