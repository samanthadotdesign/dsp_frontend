import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './styles';
import { GlobalProvider } from './store';
import Dashboard from './components/Dashboard';
import Home from './components/Home/index';
import Nav from './components/Nav/index';

export default function App() {
  return (
    <>
      <GlobalProvider>
        <GlobalStyle />
        <Nav />
        <Modal />
        <Dashboard />
        <Home />
      </GlobalProvider>
    </>
  );
}
