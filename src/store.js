import React, { useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ACTIONS = {
  GET_DATA: 'Get all initial data to show dashboard',
  GET_USER_DATA: 'Get all skills and categories for user',
  GET_USER_RESOURCES: 'Get all the resources that belong to user',
  COMPLETE_SKILL: 'Add completed skill to user',
  COMPLETE_CATEGORY: 'Add completed category of skills to user',
  ADD_RESOURCES: 'Add new resource for the unique user',

  USER_LOGGEDIN: 'Add or log in new user with list of default skills',
  USER_LOGOUT: 'Log user out of account',
  USER_AUTH: 'Check if user is logged in or not',
  USER_ERROR: 'Network error for logging in or signing up user',

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
  categoryIdsCompleted: [], // categoryIds completed so I can render the stickers
  skillIdsCompleted: [], // skillIds completed
};

const initialAuthState = {
  loggedIn: false,
  userId: 0,
  error: false,
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
    case ACTIONS.GET_USER_DATA:
      return {
        ...state,
        skillsCompleted: action.payload.skillIdsCompleted,
        skillsInCategories: action.payload.skillsInCategories,
      };
    case ACTIONS.GET_USER_RESOURCES:
      return {
        ...state,
        resourceSkills: action.payload,
      };
    // case ACTIONS.COMPLETE_SKILL:
    //   return state;
    // case ACTIONS.COMPLETE_CATEGORY:
    //   return state;
    default:
      return state;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.USER_LOGGEDIN:
      return {
        loggedIn: true,
        userId: action.payload,
        error: false,
      };
    case ACTIONS.USER_LOGOUT:
      return {
        loggedIn: false,
        userId: 0,
        error: false,
      };
    case ACTIONS.USER_AUTH:
      return {
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        error: false,
      };
    case ACTIONS.USER_ERROR:
      return state;
    default:
      return state;
  }
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP_MODAL:
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

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Connections to database
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

/** ***************** */
/** ** DASHBOARD **** */
/** ***************** */

// Get initial data to be displayed on dashboard
export const getData = (dashboardDispatch, userId) => {
  axios.get(`${REACT_APP_BACKEND_URL}/data/${userId}`).then((result) => {
    dashboardDispatch({
      type: ACTIONS.GET_DATA,
      payload: result.data,
    });
  });
};

// Get all categories for a particular section id
export const getSectionData = (dashboardDispatch, skills, sectionId, userId) => {
  axios.get(`${REACT_APP_BACKEND_URL}/section/${sectionId}/${userId}`).then((result) => {
    console.log('**** SECTION DATA INSIDE STORE ****', result.data);
    // const { categoryIds, skillIdsCompleted } = result.data;

    // Get all the skills for each section
    // const skillsInCategories = skills.filter((skill) => categoryIds.includes(skill.categoryId));

    // const temporalSectionSkills = new Array(skillsInCategories.length).fill(false);

    // dashboardDispatch({
    //   type: ACTIONS.GET_USER_DATA,
    // payload: {
    //   // Set skill ids completed so we can set it inside the skill boolean
    //   skillIdsCompleted,
    //   // Setting the conditions for muted/colored
    //   skillsInCategories,
    //   // temporalSectionSkills,
    // },
    // });
  });
};

// Find the resources via skillId and userId
export const getUserResources = (dashboardDispatch, skillId, userId) => {
  axios.get(`${REACT_APP_BACKEND_URL}/resources/${skillId}/${userId}`).then((result) => {
    console.log('GET USER RESOURCES FROM STORE', result.data);
    dashboardDispatch({
      type: ACTIONS.GET_USER_RESOURCES,
      payload: result.data,
    });
  });
};

/** ***************** */
/** AUTHENTICATION * */
/** ***************** */
export const addUser = (authDispatch, values) => {
  axios.post(`${REACT_APP_BACKEND_URL}/signup`, values).then((result) => {
    if (result.data.status === 'OK') {
      authDispatch({
        type: ACTIONS.USER_LOGGEDIN,
        payload: result.data.newUser.id,
      });
    }
    // else {
    // Error handling if unable to add user to system
    // }
  });
};

export const loginUser = (authDispatch, values) => {
  axios.post(`${REACT_APP_BACKEND_URL}/login`, values).then((result) => {
    if (result.data.status === 'OK') {
      authDispatch({
        type: ACTIONS.USER_LOGGEDIN,
        payload: result.data.userId,
      });
    }
  });
};

export const logoutUser = (authDispatch) => {
  axios.post(`${REACT_APP_BACKEND_URL}/logout`).then((result) => {
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
