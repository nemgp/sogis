import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, HardHat } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ContactForm } from '../components/ContactForm';
import { Testimonials } from '../components/Testimonials';
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


            {/* Customer Testimonials */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-slate-800 mb-2">{t('testimonials.business.title')}</h2>
                    <p className="text-slate-600">{t('testimonials.business.subtitle')}</p>
                </div>
                <Testimonials testimonials={[
                    {
                        name: t('testimonial.business1.name'),
                        role: t('testimonial.business1.role'),
                        text: t('testimonial.business1.text'),
                        rating: 5
                    },
                    {
                        name: t('testimonial.business2.name'),
                        role: t('testimonial.business2.role'),
                        text: t('testimonial.business2.text'),
                        rating: 5
                    },
                    {
                        name: t('testimonial.business3.name'),
                        role: t('testimonial.business3.role'),
                        text: t('testimonial.business3.text'),
                        rating: 5
                    },
                    {
                        name: t('testimonial.business4.name'),
                        role: t('testimonial.business4.role'),
                        text: t('testimonial.business4.text'),
                        rating: 5
                    }
                ]} />
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold text-slate-800">{t('business.contact.title')}</h2>
                <ContactForm serviceType="business" />
            </div>
        </div>
    );
};
