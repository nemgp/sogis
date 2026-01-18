import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Placeholders for now
const BusinessData = () => <div className="p-10 text-center text-2xl font-bold text-sogis-business">Module Business (Bientôt disponible)</div>;
const ServicesData = () => <div className="p-10 text-center text-2xl font-bold text-sogis-services">Module Services (Bientôt disponible)</div>;
const TrackingData = () => <div className="p-10 text-center text-2xl font-bold text-slate-600">Suivi de Dossier (Bientôt disponible)</div>;

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/business" element={<BusinessData />} />
                    <Route path="/services" element={<ServicesData />} />
                    <Route path="/tracking" element={<TrackingData />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
