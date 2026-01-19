import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Briefcase, HeartHandshake, Home, Search, Languages } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navLinks = [
        { name: t('nav.home'), path: '/', icon: Home },
        { name: t('nav.business'), path: '/business', icon: Briefcase },
        { name: t('nav.services'), path: '/services', icon: HeartHandshake },
        { name: t('nav.tracking'), path: '/tracking', icon: Search, special: true },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'fr' ? 'en' : 'fr');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-sogis-business to-sogis-services rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        S
                    </div>
                    <span className="font-heading font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-sogis-business to-sogis-services hidden sm:block">
                        SOGIS
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                "flex items-center gap-2 font-medium transition-colors hover:text-sogis-services",
                                link.special
                                    ? "bg-sogis-services/10 text-sogis-services px-4 py-2 rounded-lg border border-sogis-services/20 hover:bg-sogis-services hover:text-white transition-all"
                                    : "text-slate-600"
                            )}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Language Toggle + SOGIS Text */}
                <div className="flex items-center gap-4">
                    {/* Language Toggle Button */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-all border border-slate-200/50 text-slate-700 font-medium"
                        title={language === 'fr' ? 'Switch to English' : 'Passer au Français'}
                    >
                        <Languages className="w-4 h-4" />
                        <span className="text-sm font-semibold">{language.toUpperCase()}</span>
                    </button>

                    {/* SOGIS Text - Desktop Only */}
                    <div className="hidden lg:block">
                        <span className="font-heading font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-sogis-business to-sogis-services">
                            SOGIS
                        </span>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-600 hover:bg-black/5 rounded-lg"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
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
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 text-slate-700 font-medium"
                            >
                                <link.icon className="w-5 h-5 text-sogis-business" />
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
