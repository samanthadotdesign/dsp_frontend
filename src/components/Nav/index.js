import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import {
  Button, NavBar, NavLinks, Logo,
} from './styles';
import {
  logoutUser, GlobalContext, ACTIONS, getData,
} from '../../store';

export default function Nav() {
  // Pass in "loggedIn" and use it to conditionally render buttons using ternary statement
  const {
    dashboardDispatch, authStore, authDispatch, modalDispatch,
  } = useContext(GlobalContext);
  const { loggedIn, userId } = authStore;

  // Getting dashboard data when nav is loaded
  useEffect(async () => {
    try {
      if (loggedIn) {
        await getData(dashboardDispatch, userId);
      } else {
        await getData(dashboardDispatch, 0);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        <a aria-label="nav" href="/"><Logo src={logo} /></a>
        <NavLinks>
          <Button type="button">
            About
          </Button>
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
