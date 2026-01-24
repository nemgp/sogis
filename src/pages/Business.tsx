import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, HardHat } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { CommentForm } from '../components/CommentForm';
import { CommentsList } from '../components/CommentsList';
import { useLanguage } from '../context/LanguageContext';

export const Business = () => {
    const { t } = useLanguage();

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-sogis-business">{t('business.title')}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    {t('business.subtitle')}
                </p>
            </div>

            {/* Contact Form - NOW FIRST */}
            <div id="contact-form" className="space-y-6 scroll-mt-24">
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('business.contact.title')}</h2>
                <ContactForm serviceType="business" />
            </div>

            {/* Business Activities - All 9 from Homepage */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-4xl font-heading font-bold text-sogis-business mb-2">{t('home.business.activities.title')}</h2>
                    <p className="text-lg text-slate-600">{t('home.business.activities.subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">💰</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity1.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity1.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">📋</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity2.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity2.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">📄</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity3.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity3.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🛡️</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity4.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity4.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">💼</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity5.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity5.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">⚖️</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity6.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity6.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🌍</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity7.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity7.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">🤝</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity8.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity8.description')}
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">📊</span>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2">{t('business.activity9.title')}</h4>
                                <p className="text-sm text-slate-600">
                                    {t('business.activity9.description')}
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
                        <CommentsList serviceType="business" />
                    </div>
                    <div>
                        <CommentForm pageType="business" />
                    </div>
                </div>
            </div>
        </div>
    );
};
