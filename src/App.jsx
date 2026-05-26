import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import ProjectsPage from './pages/ProjectsPage';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
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
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
