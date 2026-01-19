import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Business } from './pages/Business';
import { Services } from './pages/Services';
import { Tracking } from './pages/Tracking';

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter basename="/sogis">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/business" element={<Business />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/tracking" element={<Tracking />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
