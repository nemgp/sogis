import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, XCircle, Mail, Star, Clock, Eye, Phone, MessageSquare, FileText, Briefcase, PartyPopper } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

interface PendingComment {
    name: string;
    email: string;
    comment: string;
    rating: number;
    timestamp: string;
    validated: boolean;
    validationToken: string;
    pageType: 'business' | 'services';
}

interface ProjectRequest {
    ticketId: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    serviceType: 'business' | 'services';
    timestamp: string;
    status: 'pending' | 'accepted' | 'in-progress' | 'completed';
    statusHistory: Array<{
        status: string;
        timestamp: string;
    }>;
}

export const Admin = () => {
    const { t } = useLanguage();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'comments' | 'requests'>('requests');

    // Comments state
    const [pendingComments, setPendingComments] = useState<PendingComment[]>([]);
    const [selectedCommentPage, setSelectedCommentPage] = useState<'all' | 'business' | 'services'>('all');

    // Requests state
    const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'accepted' | 'in-progress' | 'completed'>('all');
    const [selectedRequestType, setSelectedRequestType] = useState<'all' | 'business' | 'services'>('all');

    const ADMIN_PASSWORD = 'sogis2026';

    useEffect(() => {
        if (isAuthenticated) {
            loadPendingComments();
            loadProjectRequests();
        }
    }, [isAuthenticated]);

    const loadPendingComments = () => {
        const pending = JSON.parse(localStorage.getItem('pendingComments') || '[]');
        setPendingComments(pending);
    };

    const loadProjectRequests = () => {
        const requests = JSON.parse(localStorage.getItem('projectRequests') || '[]');
        setProjectRequests(requests);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError(t('admin.error.password'));
        }
    };

    // Comment management functions
    const handleValidateComment = (index: number) => {
        const pending = [...pendingComments];
        const comment = pending[index];
        comment.validated = true;

        const validated = JSON.parse(localStorage.getItem('validatedComments') || '[]');
        validated.push(comment);
        localStorage.setItem('validatedComments', JSON.stringify(validated));

        pending.splice(index, 1);
        localStorage.setItem('pendingComments', JSON.stringify(pending));
        setPendingComments(pending);
    };

    const handleRejectComment = (index: number) => {
        const pending = [...pendingComments];
        pending.splice(index, 1);
        localStorage.setItem('pendingComments', JSON.stringify(pending));
        setPendingComments(pending);
    };

    // Request management functions
    const updateRequestStatus = (index: number, newStatus: ProjectRequest['status']) => {
        const requests = [...projectRequests];
        requests[index].status = newStatus;
        requests[index].statusHistory.push({
            status: newStatus,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem('projectRequests', JSON.stringify(requests));
        setProjectRequests(requests);
    };

    const deleteRequest = (index: number) => {
        const requests = [...projectRequests];
        requests.splice(index, 1);
        localStorage.setItem('projectRequests', JSON.stringify(requests));
        setProjectRequests(requests);
    };

    const getStatusColor = (status: ProjectRequest['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'accepted': return 'bg-blue-100 text-blue-700 border-blue-300';
            case 'in-progress': return 'bg-purple-100 text-purple-700 border-purple-300';
            case 'completed': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredComments = selectedCommentPage === 'all'
        ? pendingComments
        : pendingComments.filter(c => c.pageType === selectedCommentPage);

    const filteredRequests = projectRequests.filter(req => {
        const statusMatch = selectedStatus === 'all' || req.status === selectedStatus;
        const typeMatch = selectedRequestType === 'all' || req.serviceType === selectedRequestType;
        return statusMatch && typeMatch;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <GlassCard className="text-center space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Lock className="w-10 h-10 text-white" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-heading font-bold text-slate-800 mb-2">
                                {t('admin.title')}
                            </h1>
                            <p className="text-slate-600">{t('admin.subtitle')}</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                                    {t('admin.password')}
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg bg-white/50 border border-white/60 px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button type="submit" className="w-full btn-primary">
                                {t('admin.login')}
                            </button>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-heading font-bold text-slate-800">
                    {t('admin.dashboard.title')}
                </h1>
                <p className="text-xl text-slate-600">
                    {t('admin.dashboard.subtitle')}
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`btn-secondary ${activeTab === 'requests' ? 'bg-blue-500 text-white border-blue-500' : ''}`}
                >
                    <FileText size={20} className="inline mr-2" />
                    {t('admin.requests.tab')} ({projectRequests.length})
                </button>
                <button
                    onClick={() => setActiveTab('comments')}
                    className={`btn-secondary ${activeTab === 'comments' ? 'bg-purple-500 text-white border-purple-500' : ''}`}
                >
                    <MessageSquare size={20} className="inline mr-2" />
                    {t('admin.requests.comments')} ({pendingComments.length})
                </button>
            </div>

            {/* REQUESTS TAB */}
            {activeTab === 'requests' && (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-heading font-bold text-slate-800 mb-2">
                            {t('admin.requests.title')}
                        </h2>
                        <p className="text-slate-600">{t('admin.requests.subtitle')}</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {/* Status Filters */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedStatus('all')}
                                className={`btn-secondary text-sm ${selectedStatus === 'all' ? 'bg-slate-500 text-white border-slate-500' : ''}`}
                            >
                                {t('admin.requests.filter.all')} ({projectRequests.length})
                            </button>
                            <button
                                onClick={() => setSelectedStatus('pending')}
                                className={`btn-secondary text-sm ${selectedStatus === 'pending' ? 'bg-yellow-500 text-white border-yellow-500' : ''}`}
                            >
                                {t('admin.status.pending')} ({projectRequests.filter(r => r.status === 'pending').length})
                            </button>
                            <button
                                onClick={() => setSelectedStatus('accepted')}
                                className={`btn-secondary text-sm ${selectedStatus === 'accepted' ? 'bg-blue-500 text-white border-blue-500' : ''}`}
                            >
                                {t('admin.status.accepted')} ({projectRequests.filter(r => r.status === 'accepted').length})
                            </button>
                            <button
                                onClick={() => setSelectedStatus('in-progress')}
                                className={`btn-secondary text-sm ${selectedStatus === 'in-progress' ? 'bg-purple-500 text-white border-purple-500' : ''}`}
                            >
                                {t('admin.status.inprogress')} ({projectRequests.filter(r => r.status === 'in-progress').length})
                            </button>
                            <button
                                onClick={() => setSelectedStatus('completed')}
                                className={`btn-secondary text-sm ${selectedStatus === 'completed' ? 'bg-green-500 text-white border-green-500' : ''}`}
                            >
                                {t('admin.status.completed')} ({projectRequests.filter(r => r.status === 'completed').length})
                            </button>
                        </div>

                        {/* Type Filters */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedRequestType('all')}
                                className={`btn-secondary text-sm ${selectedRequestType === 'all' ? 'bg-slate-500 text-white border-slate-500' : ''}`}
                            >
                                {t('admin.requests.filter.all')}
                            </button>
                            <button
                                onClick={() => setSelectedRequestType('business')}
                                className={`btn-secondary text-sm ${selectedRequestType === 'business' ? 'bg-sogis-business text-white border-sogis-business' : ''}`}
                            >
                                <Briefcase size={16} className="inline mr-1" />
                                {t('admin.requests.filter.business')}
                            </button>
                            <button
                                onClick={() => setSelectedRequestType('services')}
                                className={`btn-secondary text-sm ${selectedRequestType === 'services' ? 'bg-sogis-services text-white border-sogis-services' : ''}`}
                            >
                                <PartyPopper size={16} className="inline mr-1" />
                                {t('admin.requests.filter.services')}
                            </button>
                        </div>
                    </div>

                    {/* Requests List */}
                    {filteredRequests.length === 0 ? (
                        <GlassCard className="text-center py-12">
                            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                {t('admin.requests.empty.title')}
                            </h3>
                            <p className="text-slate-600">{t('admin.requests.empty.message')}</p>
                        </GlassCard>
                    ) : (
                        <div className="space-y-4">
                            {filteredRequests.map((request, index) => {
                                const actualIndex = projectRequests.findIndex(r => r.ticketId === request.ticketId);
                                return (
                                    <motion.div
                                        key={request.ticketId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <GlassCard className="hover:shadow-xl transition-shadow">
                                            <div className="space-y-4">
                                                {/* Header */}
                                                <div className="flex justify-between items-start flex-wrap gap-3">
                                                    <div className="flex-1 min-w-[200px]">
                                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                            <span className="font-mono text-lg font-bold text-sogis-business">
                                                                {request.ticketId}
                                                            </span>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${request.serviceType === 'business'
                                                                ? 'bg-sogis-business/10 text-sogis-business border border-sogis-business/30'
                                                                : 'bg-sogis-services/10 text-sogis-services border border-sogis-services/30'
                                                                }`}>
                                                                {request.serviceType === 'business' ? t('nav.business') : t('nav.services')}
                                                            </span>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                                                {t(`admin.status.${request.status}`)}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                                                            {request.name}
                                                        </h3>
                                                        <div className="flex flex-col gap-1 text-sm text-slate-600">
                                                            <div className="flex items-center gap-2">
                                                                <Mail size={14} />
                                                                {request.email}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Phone size={14} />
                                                                {request.phone}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock size={14} />
                                                                {formatDate(request.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Service & Message */}
                                                <div className="space-y-2">
                                                    <div className="bg-white/60 rounded-lg p-3 border border-white/60">
                                                        <p className="text-xs font-medium text-slate-500 mb-1">{t('admin.requests.label.service')}</p>
                                                        <p className="text-sm font-semibold text-slate-700">{request.service}</p>
                                                    </div>
                                                    <div className="bg-white/60 rounded-lg p-3 border border-white/60">
                                                        <p className="text-xs font-medium text-slate-500 mb-1">{t('admin.requests.label.message')}</p>
                                                        <p className="text-sm text-slate-700 leading-relaxed">{request.message}</p>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2 flex-wrap pt-2">
                                                    {request.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateRequestStatus(actualIndex, 'accepted')}
                                                            className="flex-1 min-w-[120px] btn-primary bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle2 size={18} />
                                                            {t('admin.action.accept')}
                                                        </button>
                                                    )}
                                                    {request.status === 'accepted' && (
                                                        <button
                                                            onClick={() => updateRequestStatus(actualIndex, 'in-progress')}
                                                            className="flex-1 min-w-[120px] btn-primary bg-purple-500 hover:bg-purple-600 flex items-center justify-center gap-2"
                                                        >
                                                            <Eye size={18} />
                                                            {t('admin.action.start')}
                                                        </button>
                                                    )}
                                                    {request.status === 'in-progress' && (
                                                        <button
                                                            onClick={() => updateRequestStatus(actualIndex, 'completed')}
                                                            className="flex-1 min-w-[120px] btn-primary bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2"
                                                        >
                                                            <CheckCircle2 size={18} />
                                                            {t('admin.action.complete')}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteRequest(actualIndex)}
                                                        className="flex-1 min-w-[120px] btn-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-300 flex items-center justify-center gap-2"
                                                    >
                                                        <XCircle size={18} />
                                                        {t('admin.action.delete')}
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* COMMENTS TAB */}
            {activeTab === 'comments' && (
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-heading font-bold text-slate-800 mb-2">
                            {t('admin.dashboard.title')}
                        </h2>
                        <p className="text-slate-600">{t('admin.dashboard.subtitle')}</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setSelectedCommentPage('all')}
                            className={`btn-secondary ${selectedCommentPage === 'all' ? 'bg-blue-500 text-white border-blue-500' : ''}`}
                        >
                            {t('admin.filter.all')} ({pendingComments.length})
                        </button>
                        <button
                            onClick={() => setSelectedCommentPage('business')}
                            className={`btn-secondary ${selectedCommentPage === 'business' ? 'bg-sogis-business text-white border-sogis-business' : ''}`}
                        >
                            {t('admin.filter.business')} ({pendingComments.filter(c => c.pageType === 'business').length})
                        </button>
                        <button
                            onClick={() => setSelectedCommentPage('services')}
                            className={`btn-secondary ${selectedCommentPage === 'services' ? 'bg-sogis-services text-white border-sogis-services' : ''}`}
                        >
                            {t('admin.filter.services')} ({pendingComments.filter(c => c.pageType === 'services').length})
                        </button>
                    </div>

                    {/* Pending Comments */}
                    {filteredComments.length === 0 ? (
                        <GlassCard className="text-center py-12">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                {t('admin.empty.title')}
                            </h3>
                            <p className="text-slate-600">{t('admin.empty.message')}</p>
                        </GlassCard>
                    ) : (
                        <div className="space-y-4">
                            {filteredComments.map((comment, index) => {
                                const actualIndex = pendingComments.findIndex(c =>
                                    c.email === comment.email && c.timestamp === comment.timestamp
                                );
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <GlassCard className="hover:shadow-xl transition-shadow">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-bold text-slate-800">
                                                                {comment.name}
                                                            </h3>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${comment.pageType === 'business'
                                                                ? 'bg-sogis-business/10 text-sogis-business border border-sogis-business/30'
                                                                : 'bg-sogis-services/10 text-sogis-services border border-sogis-services/30'
                                                                }`}>
                                                                {comment.pageType === 'business' ? t('nav.business') : t('nav.services')}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-sm text-slate-600">
                                                            <div className="flex items-center gap-1">
                                                                <Mail size={14} />
                                                                {comment.email}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={14} />
                                                                {formatDate(comment.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={20}
                                                                className={i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-white/60 rounded-lg p-4 border border-white/60">
                                                    <p className="text-slate-700 leading-relaxed">
                                                        {comment.comment}
                                                    </p>
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        onClick={() => handleValidateComment(actualIndex)}
                                                        className="flex-1 btn-primary flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
                                                    >
                                                        <CheckCircle2 size={20} />
                                                        {t('admin.action.validate')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectComment(actualIndex)}
                                                        className="flex-1 btn-secondary flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                                    >
                                                        <XCircle size={20} />
                                                        {t('admin.action.reject')}
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
