import React from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, Music, CalendarCheck, Star } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { Testimonials } from '../components/Testimonials';
import { useLanguage } from '../context/LanguageContext';

export const Services = () => {
    const { t } = useLanguage();

    const categories = [
        { title: t('services.category.personnel'), icon: Users },
        { title: t('services.category.logistics'), icon: Truck },
        { title: t('services.category.events'), icon: Music },
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
                {/* Customer Testimonials */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-heading font-bold text-slate-800 mb-2">{t('testimonials.services.title')}</h2>
                        <p className="text-slate-600">{t('testimonials.services.subtitle')}</p>
                    </div>
                    <Testimonials testimonials={[
                        {
                            name: t('testimonial.services1.name'),
                            role: t('testimonial.services1.role'),
                            text: t('testimonial.services1.text'),
                            rating: 5
                        },
                        {
                            name: t('testimonial.services2.name'),
                            role: t('testimonial.services2.role'),
                            text: t('testimonial.services2.text'),
                            rating: 5
                        },
                        {
                            name: t('testimonial.services3.name'),
                            role: t('testimonial.services3.role'),
                            text: t('testimonial.services3.text'),
                            rating: 5
                        },
                        {
                            name: t('testimonial.services4.name'),
                            role: t('testimonial.services4.role'),
                            text: t('testimonial.services4.text'),
                            rating: 5
                        }
                    ]} />
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
