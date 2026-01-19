import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, HardHat } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

export const Business = () => {
    const { t } = useLanguage();

    const services = [
        {
            title: t('business.service1.title'),
            icon: TrendingUp,
            description: t('business.service1.description'),
            color: "text-blue-600"
        },
        {
            title: t('business.service2.title'),
            icon: Scale,
            description: t('business.service2.description'),
            color: "text-indigo-600"
        },
        {
            title: t('business.service3.title'),
            icon: HardHat,
            description: t('business.service3.description'),
            color: "text-cyan-600"
        }
    ];

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-sogis-business">{t('business.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('business.subtitle')}
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
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('business.opportunities.title')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="flex flex-col gap-4">
                        <div className="h-48 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 w-full flex items-center justify-center text-blue-300 font-bold text-lg">
                            [Image Projet Immobilier]
                        </div>
                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">{t('business.opportunity1.status')}</span>
                            <h3 className="text-2xl font-bold text-slate-800">{t('business.opportunity1.title')}</h3>
                            <p className="text-slate-600">{t('business.opportunity1.description')}</p>
                            <div className="flex justify-between items-center text-sm font-medium text-slate-500 pt-2 border-t border-slate-200/50">
                                <span>{t('business.opportunity1.return')}</span>
                                <span>{t('business.opportunity1.min')}</span>
                            </div>
                        </div>
                        <button className="btn-primary w-full mt-auto">{t('business.opportunity1.cta')}</button>
                    </GlassCard>

                    <GlassCard className="flex flex-col gap-4">
                        <div className="h-48 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 w-full flex items-center justify-center text-amber-300 font-bold text-lg">
                            [Image Projet Agricole]
                        </div>
                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">{t('business.opportunity2.status')}</span>
                            <h3 className="text-2xl font-bold text-slate-800">{t('business.opportunity2.title')}</h3>
                            <p className="text-slate-600">{t('business.opportunity2.description')}</p>
                            <div className="flex justify-between items-center text-sm font-medium text-slate-500 pt-2 border-t border-slate-200/50">
                                <span>{t('business.opportunity2.return')}</span>
                                <span>{t('business.opportunity2.min')}</span>
                            </div>
                        </div>
                        <button className="btn-primary w-full mt-auto">{t('business.opportunity2.cta')}</button>
                    </GlassCard>
                </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('business.contact.title')}</h2>
                <ContactForm serviceType="business" />
            </div>
        </div>
    );
};
