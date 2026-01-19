import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, PartyPopper, ArrowRight, MapPin, Phone, Mail, Users } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

export const Home = () => {
    const { t } = useLanguage();
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
                            <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">{t('home.business.title')}</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-md">
                                {t('home.business.description')}
                            </p>
                            <Link to="/business" className="flex items-center gap-2 text-sogis-business font-semibold text-lg hover:gap-4 transition-all">
                                {t('home.business.cta')} <ArrowRight size={20} />
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
                            <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">{t('home.services.title')}</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-md">
                                {t('home.services.description')}
                            </p>
                            <Link to="/services" className="flex items-center gap-2 text-sogis-services font-semibold text-lg hover:gap-4 transition-all">
                                {t('home.services.cta')} <ArrowRight size={20} />
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
                    <h2 className="text-5xl font-heading font-bold text-slate-800">{t('home.about.title')}</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {t('home.about.subtitle')}
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
                                <h3 className="text-2xl font-bold text-slate-800">{t('home.about.who')}</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                {t('home.about.description1')}
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                {t('home.about.description2')}
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
                        <h3 className="text-4xl font-heading font-bold text-sogis-business mb-2">{t('home.business.activities.title')}</h3>
                        <p className="text-lg text-slate-600">{t('home.business.activities.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GlassCard className="border-l-4 border-l-sogis-business hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-business">1</span>
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
                                <span className="text-2xl font-bold text-sogis-business">2</span>
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
                                <span className="text-2xl font-bold text-sogis-business">3</span>
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
                                <span className="text-2xl font-bold text-sogis-business">4</span>
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
                                <span className="text-2xl font-bold text-sogis-business">5</span>
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
                                <span className="text-2xl font-bold text-sogis-business">6</span>
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
                                <span className="text-2xl font-bold text-sogis-business">7</span>
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
                                <span className="text-2xl font-bold text-sogis-business">8</span>
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
                                <span className="text-2xl font-bold text-sogis-business">9</span>
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

                {/* Services Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-4xl font-heading font-bold text-sogis-services mb-2">{t('home.services.list.title')}</h3>
                        <p className="text-lg text-slate-600">{t('home.services.list.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GlassCard className="border-l-4 border-l-sogis-services hover:scale-105 transition-transform">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-bold text-sogis-services">A</span>
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
                                <span className="text-2xl font-bold text-sogis-services">B</span>
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
                                <span className="text-2xl font-bold text-sogis-services">C</span>
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
                                <span className="text-2xl font-bold text-sogis-services">D</span>
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
                                <span className="text-2xl font-bold text-sogis-services">E</span>
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
                                <span className="text-2xl font-bold text-sogis-services">F</span>
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
                                <span className="text-2xl font-bold text-sogis-services">G</span>
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
                                <span className="text-2xl font-bold text-sogis-services">H</span>
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
                                <span className="text-2xl font-bold text-sogis-services">I</span>
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

                {/* How to Contact Section */}
                <GlassCard className="bg-gradient-to-br from-white/40 to-white/20">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-sogis-services/10 text-sogis-services">
                                    <MapPin size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">{t('home.contact.title')}</h3>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-bold text-slate-800 text-lg">{t('home.contact.navigation')}</h4>
                                <ul className="space-y-2 ml-4 text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-business mt-1">→</span>
                                        <span>{t('home.contact.nav1')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sogis-services mt-1">→</span>
                                        <span>{t('home.contact.nav2')}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400 mt-1">→</span>
                                        <span>{t('home.contact.nav3')}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-white/40 space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-sogis-business" />
                                    <span><strong>{t('home.contact.location')}</strong> {t('home.contact.location.value')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-sogis-business" />
                                    <span><strong>{t('home.contact.availability')}</strong> {t('home.contact.availability.value')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-sogis-business" />
                                    <span><strong>{t('home.contact.response')}</strong> {t('home.contact.response.value')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 text-lg">{t('home.contact.steps.title')}</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">1️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">{t('home.contact.step1.title')}</p>
                                        <p className="text-sm text-slate-600">{t('home.contact.step1.description')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">2️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">{t('home.contact.step2.title')}</p>
                                        <p className="text-sm text-slate-600">{t('home.contact.step2.description')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/50">
                                    <span className="text-2xl">3️⃣</span>
                                    <div>
                                        <p className="font-semibold text-slate-800">{t('home.contact.step3.title')}</p>
                                        <p className="text-sm text-slate-600">{t('home.contact.step3.description')}</p>
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
                            {t('home.cta.title')}
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            {t('home.cta.description')}
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link to="/business" className="btn-primary">
                                {t('home.cta.business')}
                            </Link>
                            <Link to="/services" className="btn-secondary">
                                {t('home.cta.services')}
                            </Link>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};
