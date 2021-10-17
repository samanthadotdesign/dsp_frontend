import React, { useReducer } from 'react';
import axios from 'axios';

export const ACTIONS = {
  GET_DATA: 'Get all initial data to show dashboard',
  GET_CATEGORIES: 'Get completed categories for the user only',
  GET_RESOURCES: 'Get resources added for the user only',
  GET_SKILLS: 'Get completed skills for the user only',
  ADD_USER: 'Add new user with list of default skills',
  USER_LOGIN: 'Log existing user into their account',
  USER_LOGOUT: 'Log user out of account',
  USER_AUTH: 'Check if user is logged in',
  ADD_RESOURCES: 'Add new resource for the unique user',
};

// Initial dashboard state
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
};

export const GlobalContext = React.createContext(null);

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
    default:
      return state;
  }
};

const { Provider } = GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [dashboardStore, dashboardDispatch] = useReducer(dashboardReducer, initialState);
  const [authStore, authDispatch] = useReducer(authReducer, initialAuthState);
  return (
    <Provider
      value={{
        dashboardStore,
        dashboardDispatch,
        authStore,
        authDispatch,
      }}
    >
      {children}
    </Provider>
  );
};

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export const getData = (dashboardDispatch) => axios.get(`${REACT_APP_BACKEND_URL}/data`).then((result) => {
  console.log('**** GET DATA INSIDE STORE ****');
  console.log(result);
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

export const addUser = (authDispatch, values) => {
  axios.post(`${REACT_APP_BACKEND_URL}/signup`, values).then((result) => {
    // result.data will give us the status codes
    if (result.data === 'OK') {
      authDispatch({
        type: ACTIONS.ADD_USER,
      });
    }
  });
};
