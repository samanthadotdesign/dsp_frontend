import React, { useReducer } from 'react';
import axios from 'axios';

export const ACTIONS = {
  GET_DATA: 'Get all initial data to show dashboard',
  GET_CATEGORIES: 'Get completed categories for the user only',
  GET_RESOURCES: 'Get resources added for the user only',
  GET_SKILLS: 'Get completed skills for the user only',
  ADD_RESOURCES: 'Add new resource for the unique user',

  ADD_USER: 'Add new user with list of default skills',
  USER_LOGIN: 'Log existing user into their account',
  USER_LOGOUT: 'Log user out of account',
  USER_AUTH: 'Check if user is logged in',

  CLOSE_MODALS: 'Closes all modals',
  SIGNUP_MODAL: 'Opens sign up modal only',
  LOGIN_MODAL: 'Opens login modal only',
  ERROR_MODAL: 'Opens error modal only',
};

// Initial store states
const initialState = {
  sections: [],
  categories: [],
  skills: [],
  resources: [],
  categoriesCompleted: [],
  skillsCompleted: [],
};

const initialAuthState = {
  loggedIn: false,
  userId: 0,
};

const initialModalState = {
  signupModal: false,
  loginModal: false,
  errorModal: false,
};

export const GlobalContext = React.createContext(null);

// Reducer functions
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_USER:
      return { loggedIn: true };
    case ACTIONS.USER_LOGIN:
      return { loggedIn: true };
    case ACTIONS.USER_LOGOUT:
      return { loggedIn: false };
    case ACTIONS.USER_AUTH:
      return { loggedIn: action.payload };
    default:
      return state;
  }
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP_MODAL:
      console.log('*** SIGNING UP ****');
      return {
        signupModal: true,
        loginModal: false,
        errorModal: false,
      };
    case ACTIONS.LOGIN_MODAL:
      return {
        signupModal: false,
        loginModal: true,
        errorModal: false,
      };
    case ACTIONS.ERROR_MODAL:
      return {
        signupModal: false,
        loginModal: false,
        errorModal: true,
      };
    case ACTIONS.CLOSE_MODALS:
      return {
        signupModal: false,
        loginModal: false,
        errorModal: false,
      };
    default:
      return state;
  }
};

// Global Provider for entire application
const { Provider } = GlobalContext;
export const GlobalProvider = ({ children }) => {
  const [dashboardStore, dashboardDispatch] = useReducer(dashboardReducer, initialState);
  const [authStore, authDispatch] = useReducer(authReducer, initialAuthState);
  const [modalStore, modalDispatch] = useReducer(modalReducer, initialModalState);

  return (
    <Provider
      value={{
        dashboardStore,
        dashboardDispatch,
        authStore,
        authDispatch,
        modalStore,
        modalDispatch,
      }}
    >
      {children}
    </Provider>
  );
};

// Connections to database
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

/** ***************** */
/** ** DASHBOARD **** */
/** ***************** */
export const getData = (dashboardDispatch, userId) => {
  axios.get(`${REACT_APP_BACKEND_URL}/data/${userId}`).then((result) => {
    const {
      sections,
      categories,
      skills,
      resources,
      categoriesCompleted,
      skillsCompleted,
    } = result.data;
    dashboardDispatch({
      type: ACTIONS.GET_DATA,
      payload: {
        sections,
        categories,
        skills,
        resources,
        categoriesCompleted,
        skillsCompleted,
      },
    });
  // return result.data;
  });
};

/** ***************** */
/** AUTHENTICATION * */
/** ***************** */
export const addUser = (authDispatch, values) => {
  axios.post(`${REACT_APP_BACKEND_URL}/signup`, values).then((result) => {
    console.log(result);
    if (result.data === 'OK') {
      authDispatch({
        type: ACTIONS.ADD_USER,
      });
    }
  });
};

export const loginUser = (authDispatch, values) => {
  axios.post(`${REACT_APP_BACKEND_URL}/login`, values).then((result) => {
    if (result.data === 'OK') {
      authDispatch({
        type: ACTIONS.USER_LOGIN,
      });
    }
  });
};

export const logoutUser = (authDispatch) => {
  axios.post(`${REACT_APP_BACKEND_URL}/logout`).then((result) => {
    console.log('running logout function');
    if (result.data === 'OK') {
      authDispatch({
        type: ACTIONS.USER_LOGOUT,
      });
    }
  });
};

// On page load, checks if there is already a cookie/user is logged in
export const authUser = (authDispatch) => {
  axios.post(`${REACT_APP_BACKEND_URL}/auth`).then((result) => {
    console.log(result);
    // Expecting result to be true or false depending if cookies exist
    authDispatch({
      type: ACTIONS.USER_AUTH,
      payload: result,
    });
  });
};
