import React, { useState } from 'react';
import { Menu, X, Briefcase, HeartHandshake, Home, Search } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Accueil', path: '/', icon: Home },
        { name: 'Business & Finance', path: '/business', icon: Briefcase },
        { name: 'Services & Events', path: '/services', icon: HeartHandshake },
        { name: 'Suivre mon Dossier', path: '/tracking', icon: Search, special: true },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-sogis-business to-sogis-services rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        S
                    </div>
                    <span className="font-heading font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-sogis-business to-sogis-services">
                        SOGIS
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path} // In a real app use Link from router
                            className={clsx(
                                "flex items-center gap-2 font-medium transition-colors hover:text-sogis-services",
                                link.special
                                    ? "bg-sogis-services/10 text-sogis-services px-4 py-2 rounded-lg border border-sogis-services/20 hover:bg-sogis-services hover:text-white transition-all"
                                    : "text-slate-600"
                            )}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-600 hover:bg-black/5 rounded-lg"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-4 md:hidden flex flex-col gap-2"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 text-slate-700 font-medium"
                            >
                                <link.icon className="w-5 h-5 text-sogis-business" />
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
