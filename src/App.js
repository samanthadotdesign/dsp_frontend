import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './styles';
import Dashboard from './components/Dashboard';
import Home from './components/Home/index';
import Nav from './components/Nav/index';

export default function App() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resources, setResources] = useState([]);
  const [categoriesCompleted, setCategoriesCompleted] = useState([]);
  const [skillsCompleted, setSkillsCompleted] = useState([]);

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

  // Initializes on load all the info from the database
  useEffect(() => {
    axios.get('/data').then((result) => {
      const {
        sections: appSections,
        categories: appCategories,
        skills: appSkills,
        resources: appResources,
        categoriesCompleted: appCategoriesCompleted,
        skillsCompleted: appSkillsCompleted,
      } = result.data;

      setSections(appSections);
      setCategories(appCategories);
      setSkills(appSkills);
      setResources(appResources);
      setCategoriesCompleted(appCategoriesCompleted);
      setSkillsCompleted(appSkillsCompleted);
    });
  }, []);

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
    </>
  );
}
