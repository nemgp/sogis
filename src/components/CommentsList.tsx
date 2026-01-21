import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchComments, type Comment as APIComment } from '../services/googleSheetsAPI';



interface CommentsListProps {
    pageType: 'business' | 'services';
}

export const CommentsList = ({ pageType }: CommentsListProps) => {
    const { t } = useLanguage();
    const [comments, setComments] = useState<APIComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadComments = async () => {
            try {
                setLoading(true);
                // Charger les commentaires validés depuis Google Sheets
                const allComments = await fetchComments('validated');
                // Filtrer par type de page
                const filteredComments = allComments.filter(c => c.serviceType === pageType);
                setComments(filteredComments);
            } catch (error) {
                console.error('Erreur lors du chargement des commentaires:', error);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [pageType]);

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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sogis-business mx-auto"></div>
                <p className="text-slate-500 mt-2">Chargement des commentaires...</p>
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-slate-500">{t('comments.list.empty')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <GlassCard className="hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-slate-800">{comment.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock size={14} />
                                {formatDate(comment.timestamp)}
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{comment.comment}</p>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};
