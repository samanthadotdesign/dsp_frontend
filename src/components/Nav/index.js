import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import {
  Button, NavBar, NavLinks, Logo,
} from './styles';
import {
  logoutUser, GlobalContext, ACTIONS, getData, authUser, handleWindowDimensions, handleTouchCapabilities,
} from '../../store';

export default function Nav() {
  // Pass in "loggedIn" and use it to conditionally render buttons using ternary statement
  const {
    dashboardDispatch, authStore, authDispatch, modalDispatch, windowDispatch,
  } = useContext(GlobalContext);
  const { loggedIn, userId } = authStore;

  // Getting dashboard data when nav is loaded
  useEffect(async () => {
    try {
      await handleWindowDimensions(windowDispatch);
      await handleTouchCapabilities(windowDispatch);
      // Checking local storage for logged in data
      const isLoggedIn = await authUser(authDispatch);
      if (isLoggedIn) {
        await getData(dashboardDispatch, userId);
      } else {
        await getData(dashboardDispatch, 0);
      }
    } catch (error) {
      console.error(error);
    }
  }, [loggedIn]);

  const handleLogOutSubmit = async () => {
    try {
      await logoutUser(authDispatch);
    } catch (error) {
      // Error handling if the user is unable to log out
      console.log(error);
    }
  };

  // We use event handler functions to call the dispatch function, prevents an infinite loop
  const toggleLoginModal = () => {
    modalDispatch({ type: ACTIONS.LOGIN_MODAL });
  };

  const toggleSignupModal = () => {
    modalDispatch({ type: ACTIONS.SIGNUP_MODAL });
  };

  return (
    <>
      <NavBar>
        <Link
          aria-label="nav"
          to="/"
        >
          <Logo src={logo} />
        </Link>
        <NavLinks>
          <Link to="/about">
            <Button type="button">
              About
            </Button>
          </Link>
          {!loggedIn
        && (
        <Button
          type="button"
          onClick={toggleLoginModal}
        >
          Log in
        </Button>
        )}

          {!loggedIn
        && (
        <Button
          type="button"
          onClick={toggleSignupModal}
        >
          Sign up
        </Button>
        )}

          {loggedIn
        && (
        <Button
          type="button"
          onClick={handleLogOutSubmit}
        >
          Log out
        </Button>
        )}
        </NavLinks>
      </NavBar>

    </>
  );
}
