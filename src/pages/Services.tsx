import React from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, Music, CalendarCheck, Star } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

export const Services = () => {
    const { t } = useLanguage();

    const categories = [
        { title: t('services.category.personnel'), icon: Users },
        { title: t('services.category.logistics'), icon: Truck },
        { title: t('services.category.events'), icon: Music },
    ];

    const personnel = [
        { name: t('services.partner1.name'), role: t('services.partner1.role'), rating: 4.8, reviews: 124 },
        { name: t('services.partner2.name'), role: t('services.partner2.role'), rating: 4.9, reviews: 89 },
        { name: t('services.partner3.name'), role: t('services.partner3.role'), rating: 4.7, reviews: 56 },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-sogis-services">{t('services.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('services.subtitle')}
                </p>
            </div>

            {/* Categories */}
            <div className="flex justify-center gap-4 flex-wrap">
                {categories.map((cat, idx) => (
                    <button key={idx} className="btn-secondary flex items-center gap-2 hover:bg-sogis-services/10 hover:text-sogis-services hover:border-sogis-services/30">
                        <cat.icon size={20} />
                        {cat.title}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Marketplace Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-heading font-bold text-slate-800">{t('services.partners.title')}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {personnel.map((p, idx) => (
                            <GlassCard key={idx} className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-slate-800">{p.name}</h3>
                                    <div className="text-sm text-sogis-services font-medium">{p.role}</div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                        <span>{p.rating} ({p.reviews} {t('services.partner1.reviews')})</span>
                                    </div>
                                </div>
                                <button className="ml-auto text-sm font-semibold text-sogis-services border border-sogis-services/30 px-3 py-1 rounded-lg hover:bg-sogis-services hover:text-white transition-all">
                                    {t('services.book')}
                                </button>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Quote Simulator Widget */}
                <div className="lg:col-span-1">
                    <GlassCard className="h-full bg-gradient-to-b from-white/40 to-white/20 border-t-4 border-t-sogis-services">
                        <div className="flex items-center gap-2 mb-6 text-sogis-services">
                            <CalendarCheck size={24} />
                            <h3 className="text-xl font-bold">{t('services.quote.title')}</h3>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('services.quote.event_type')}</label>
                                <select className="w-full rounded-lg bg-white/50 border border-white/60 p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-services/50">
                                    <option>{t('services.quote.event.wedding')}</option>
                                    <option>{t('services.quote.event.funeral')}</option>
                                    <option>{t('services.quote.event.conference')}</option>
                                    <option>{t('services.quote.event.birthday')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('services.quote.guests')}</label>
                                <input
                                    type="number"
                                    placeholder={t('services.quote.guests.placeholder')}
                                    className="w-full rounded-lg bg-white/50 border border-white/60 p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sogis-services/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('services.quote.services')}</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-slate-600">
                                        <input type="checkbox" className="rounded text-sogis-services focus:ring-sogis-services" /> {t('services.quote.service.catering')}
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-600">
                                        <input type="checkbox" className="rounded text-sogis-services focus:ring-sogis-services" /> {t('services.quote.service.security')}
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-600">
                                        <input type="checkbox" className="rounded text-sogis-services focus:ring-sogis-services" /> {t('services.quote.service.hostesses')}
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/40">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm font-medium text-slate-600">{t('services.quote.estimate')}</span>
                                    <span className="text-xl font-bold text-sogis-services">-- FCFA</span>
                                </div>
                                <button className="w-full btn-primary py-2 text-sm">
                                    {t('services.quote.cta')}
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('services.contact.title')}</h2>
                <ContactForm serviceType="services" />
            </div>
        </div>
    );
};
