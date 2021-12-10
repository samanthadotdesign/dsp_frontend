import React, { useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ACTIONS = {
  GET_WINDOW_DIMENSIONS: 'Get window dimensions for the browser',

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
const initialWindowState = {
  width: 0,
  height: 0,
  showMobileView: false,
};

const initialState = {
  sections: [],
  categories: [],
  skills: [],
  resources: [],
  categoriesCompleted: [], // need the entire object for a completed category to render stickers
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
        skillsIdsCompleted: action.payload.skillIdsCompleted,
        skillsInCategories: action.payload.skillsInCategories,
      };
    case ACTIONS.GET_USER_RESOURCES:
      return {
        ...state,
        resourceSkills: action.payload,
      };
    case ACTIONS.COMPLETE_SKILL:
      return {
        ...state,
        skillIdsCompleted: action.payload,
      };
    case ACTIONS.COMPLETE_CATEGORY:
      return {
        ...state,
        categoriesCompleted: action.payload,
      };
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

const windowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_WINDOW_DIMENSIONS:
      return { ...action.payload };
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
  const [windowStore, windowDispatch] = useReducer(windowReducer, initialWindowState);

  return (
    <Provider
      value={{
        dashboardStore,
        dashboardDispatch,
        authStore,
        authDispatch,
        modalStore,
        modalDispatch,
        windowStore,
        windowDispatch,
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

// Find the resources via skillId and userId
export const getUserResources = (dashboardDispatch, skillId, userId) => {
  axios.get(`${REACT_APP_BACKEND_URL}/resources/${skillId}/${userId}`).then((result) => {
    dashboardDispatch({
      type: ACTIONS.GET_USER_RESOURCES,
      payload: result.data,
    });
  });
};

export const addNewSkill = (dashboardDispatch, skillId, userId, skillCompleted) => {
  axios.post(`${REACT_APP_BACKEND_URL}/skill/${skillId}`, { userId, skillCompleted }).then((result) => {
    const { updatedSkillIds } = result.data;
    dashboardDispatch({
      type: ACTIONS.COMPLETE_SKILL,
      payload: updatedSkillIds,
    });
  });
};

/** ***************** */
/** AUTHENTICATION ** */
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

export const loginUser = (authDispatch, values) => axios.post(`${REACT_APP_BACKEND_URL}/login`, values).then((result) => {
  if (result.data.status === 'OK') {
    const { data } = result;
    authDispatch({
      type: ACTIONS.USER_LOGGEDIN,
      payload: data.userId,
    });
    return data;
  }
  return {};
});

export const logoutUser = (authDispatch) => {
  axios.post(`${REACT_APP_BACKEND_URL}/logout`).then((result) => {
    if (result.data === 'OK') {
      localStorage.removeItem('userId');
      localStorage.removeItem('loggedInDate');
      localStorage.removeItem('loggedIn');

      authDispatch({
        type: ACTIONS.USER_LOGOUT,
      });
    }
  });
};

// On initialization, we check the localStorage if the user is logged in
export const authUser = (authDispatch) => {
  // Get data from localStorage
  const userId = localStorage.getItem('userId');
  const loggedInDateTimespamp = localStorage.getItem('loggedInDate');
  const loggedIn = localStorage.getItem('loggedIn');

  // Define how long we want the session to be valid for
  const currentDate = new Date();
  const loggedInDate = new Date(loggedInDateTimespamp * 1000);
  const differenceInTime = currentDate.getTime() - loggedInDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  if (differenceInDays > 6) {
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedInDate');
    localStorage.removeItem('loggedIn');
    return false;
  }
  authDispatch({
    type: ACTIONS.USER_AUTH,
    payload: { userId, loggedIn },
  });
  return true;
};

/** ***************** */
/** **** WINDOW ***** */
/** ***************** */
export const handleWindowDimensions = (windowDispatch) => {
  // On initial load, set the window width and height
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile = (width < 550);
  windowDispatch({
    type: ACTIONS.GET_WINDOW_DIMENSIONS,
    payload: {
      width,
      height,
      showMobileView: isMobile,
    },
  });
  return { width, height };
};

// Handle resize after page has loaded
// useEffect(() => {
//     const handleResize = () => {
//       setWindowDimensions(getWindowDimensions());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
