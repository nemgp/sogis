import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, PartyPopper, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

export const Home = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6 min-h-[80vh] items-center">

            {/* Business Section */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="h-full"
            >
                <GlassCard className="h-full flex flex-col justify-center items-start text-left min-h-[400px] border-l-4 border-l-sogis-business hover:bg-white/50 transition-colors group">
                    <div className="p-4 rounded-2xl bg-sogis-business/10 text-sogis-business mb-6 group-hover:scale-110 transition-transform">
                        <Building2 size={48} />
                    </div>
                    <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">SOGIS Business</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md">
                        Expertise en investissement, accompagnement juridique et opportunités d'affaires en Afrique.
                        La rigueur institutionnelle pour vos projets.
                    </p>
                    <Link to="/business" className="flex items-center gap-2 text-sogis-business font-semibold text-lg hover:gap-4 transition-all">
                        Accéder à l'espace Business <ArrowRight size={20} />
                    </Link>
                </GlassCard>
            </motion.div>

            {/* Services Section */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full"
            >
                <GlassCard className="h-full flex flex-col justify-center items-start text-left min-h-[400px] border-l-4 border-l-sogis-services hover:bg-white/50 transition-colors group">
                    <div className="p-4 rounded-2xl bg-sogis-services/10 text-sogis-services mb-6 group-hover:scale-110 transition-transform">
                        <PartyPopper size={48} />
                    </div>
                    <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">SOGIS Services</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md">
                        Logistique événementielle, personnel qualifié et services à la demande.
                        Flexibilité et dynamisme pour vos événements.
                    </p>
                    <Link to="/services" className="flex items-center gap-2 text-sogis-services font-semibold text-lg hover:gap-4 transition-all">
                        Accéder à l'espace Services <ArrowRight size={20} />
                    </Link>
                </GlassCard>
            </motion.div>

        </div>
    );
};
