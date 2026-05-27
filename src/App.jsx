import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin';
import AdminBar from './components/AdminBar';
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
        <AdminBar />
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
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </Layout>
      </AdminProvider>
    </Router>
  );
}

export default App;
