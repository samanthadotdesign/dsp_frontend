import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './styles';
import { GlobalProvider } from './store';
import Dashboard from './components/Dashboard';
import Home from './components/Home/index';
import Nav from './components/Nav/index';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // On page load, checks if there is already a cookie/user is logged in
  useEffect(() => {
    axios.get('/auth').then((result) => {
      const isLoggedIn = result.data;
      if (isLoggedIn) {
        setLoggedIn(true);
      }
    });
  });

  const toggleSignUpModal = () => {
    // Log in modal should be closed
    setShowLogInModal(false);
    // Show sign up modal if sign up modal is not open
    // If open, close sign up modal
    setShowSignUpModal(!showSignUpModal);
    setShowErrorModal(false);
  };

  const toggleLogInModal = () => {
    setShowSignUpModal(false);
    setShowLogInModal(!showLogInModal);
    setShowErrorModal(false);
  };

  const toggleErrorModal = () => {
    setShowLogInModal(false);
    setShowSignUpModal(false);
    setShowErrorModal(true);
  };

  return (
    <>
      <GlobalProvider>
        <GlobalStyle />

        <Nav
          loggedIn={loggedIn}
          toggleLogInModal={toggleLogInModal}
          toggleSignUpModal={toggleSignUpModal}
          setLoggedIn={setLoggedIn}
        />

        {loggedIn && (
        <Dashboard
          sections={sections}
          skills={skills}
          categoriesCompleted={categoriesCompleted}
          setCategoriesCompleted={setCategoriesCompleted}
        />
        )}
        {!loggedIn && (
        <Home
          showLogInModal={showLogInModal}
          toggleLogInModal={toggleLogInModal}
          toggleSignUpModal={toggleSignUpModal}
          showSignUpModal={showSignUpModal}
          setLoggedIn={setLoggedIn}
          showErrorModal={showErrorModal}
          toggleErrorModal={toggleErrorModal}
        />
        )}
      </GlobalProvider>
    </>
  );
}
