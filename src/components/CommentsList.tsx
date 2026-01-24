import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchComments, type Comment } from '../services/googleSheetsAPI';

interface CommentsListProps {
    serviceType: 'business' | 'services';
}

export const CommentsList = ({ serviceType }: CommentsListProps) => {
    const { t } = useLanguage();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadComments();
    }, [serviceType]);

    const loadComments = async () => {
        try {
            const allComments = await fetchComments('validated');
            const filtered = allComments.filter(c => c.serviceType === serviceType);
            setComments(filtered);
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-sogis-business mx-auto"></div>
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <GlassCard className="text-center py-8">
                <p className="text-slate-600">{t('comments.empty')}</p>
            </GlassCard>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => (
                <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <GlassCard className="hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-slate-800">{comment.name}</h4>
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-700 mb-2">{comment.comment}</p>
                                <p className="text-sm text-slate-500">{formatDate(comment.timestamp)}</p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};
