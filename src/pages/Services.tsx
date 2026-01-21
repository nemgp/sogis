import React from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, Music, Star } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { CommentForm } from '../components/CommentForm';
import { CommentsList } from '../components/CommentsList';
import { useLanguage } from '../context/LanguageContext';

export const Services = () => {
    const { t } = useLanguage();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-sogis-services">{t('services.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('services.subtitle')}
                </p>
            </div>

            {/* Contact Form - NOW FIRST */}
            <div id="contact-form" className="space-y-6 scroll-mt-24">
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('services.contact.title')}</h2>
                <ContactForm serviceType="services" />
            </div>

            {/* Services - All 9 from Homepage */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-4xl font-heading font-bold text-sogis-services mb-2">{t('home.services.list.title')}</h2>
                    <p className="text-lg text-slate-600">{t('home.services.list.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🍽️</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.a.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.a.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">☕</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.b.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.b.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🔥</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.c.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.c.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🎭</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.d.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.d.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🏗️</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.e.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.e.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">👋</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.f.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.f.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🛡️</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.g.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.g.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">👨‍🍳</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.h.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.h.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🥩</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('service.i.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('service.i.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800 text-center">{t('comments.list.title')}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <CommentsList pageType="services" />
                    </div>
                    <div>
                        <CommentForm pageType="services" />
                    </div>
                </div>
            </div>
        </div>
    );
};
