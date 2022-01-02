import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { GlobalProvider } from './store';
import Dashboard from './components/Dashboard';
import Home from './components/Home/index';
import Nav from './components/Nav/index';
import Modal from './components/Modal';

export default function App() {
  return (
    <Router>
      <GlobalProvider>
        <GlobalStyle />
        <Nav />
        <Modal />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}
