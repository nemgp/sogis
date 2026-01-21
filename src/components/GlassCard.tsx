import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx(
                'glass-card p-6 relative overflow-hidden',
                className
            )}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sogis-services/50 to-sogis-business/50 opacity-50" />
            {children}
        </motion.div>
    );
};
