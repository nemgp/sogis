import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GlassCard } from '../components/GlassCard';

export const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError('Email ou mot de passe incorrect.');
        } else {
            navigate('/admin', { replace: true });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <GlassCard className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-slate-800">
                                Administration
                            </h1>
                            <p className="text-slate-500 mt-1">
                                Accès réservé aux administrateurs SOGIS
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 border border-white/60 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
                                    placeholder="admin@sogis.cm"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/60 border border-white/60 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            id="admin-login-btn"
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Se connecter
                                </>
                            )}
                        </button>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
};
