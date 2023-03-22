import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import FormPage from '../pages/FormPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<About />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default Router;
