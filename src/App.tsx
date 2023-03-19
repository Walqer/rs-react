import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './components/Router';

export function App() {
  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
