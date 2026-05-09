import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { ScrollToHash } from './components/ScrollToHash';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Business } from './pages/Business';
import { Services } from './pages/Services';
import { Tracking } from './pages/Tracking';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter basename="/sogis">
                <ScrollToHash />
                <Routes>
                    {/* Routes publiques avec Layout */}
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/business" element={<Layout><Business /></Layout>} />
                    <Route path="/services" element={<Layout><Services /></Layout>} />
                    <Route path="/tracking" element={<Layout><Tracking /></Layout>} />

                    {/* Page de login admin — sans protection */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Dashboard admin — protégé par Supabase Auth */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Layout><Admin /></Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
