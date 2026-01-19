import React from 'react';
import { Star } from 'lucide-react';
import { GlassCard } from './GlassCard';

export interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
                <GlassCard key={idx} className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sogis-business/20 to-sogis-services/20 flex items-center justify-center text-2xl font-bold text-slate-700">
                            {testimonial.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                            <p className="text-sm text-slate-600">{testimonial.role}</p>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">
                        "{testimonial.text}"
                    </p>
                </GlassCard>
            ))}
        </div>
    );
};
