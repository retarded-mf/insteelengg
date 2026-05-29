import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import AboutInsteel from './pages/AboutInsteel';
import TheTeam from './pages/TheTeam';
import Awards from './pages/Awards';
import OurClients from './pages/OurClients';
import WhatWeDo from './pages/WhatWeDo';
import ProjectsPage from './pages/ProjectsPage';
import Blog from './pages/Blog';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Barricading from './pages/Barricading';
import BarricadingSpecs from './pages/BarricadingSpecs';
import AdminLogin from './pages/AdminLogin';
import News from './pages/News';
import Investor from './pages/Investor';
import AnnualReport from './pages/AnnualReport';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import { AdminProvider } from './context/AdminContext';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutInsteel />} />
            <Route path="/team" element={<TheTeam />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/clients" element={<OurClients />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/barricading" element={<Barricading />} />
            <Route path="/products/barricading/mandates" element={<BarricadingSpecs />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/news" element={<News />} />
            <Route path="/investor" element={<Investor />} />
            <Route path="/annual-report" element={<AnnualReport />} />
            <Route path="/careers" element={<Careers />} />
            {/* Premium 404 Route Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AdminProvider>
    </Router>
  );
}

export default App;
