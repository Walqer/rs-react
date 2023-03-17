import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserCard from './components/UserCard';
import Header from './components/Header';
import Router from './components/Router';

export function App() {
  return (
    <>
      <Header />
      <Router />
      <UserCard />
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
