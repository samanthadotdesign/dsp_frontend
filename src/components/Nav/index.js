import React, { useContext } from 'react';
import logo from './logo.svg';
import {
  Button, NavBar, NavLinks, Logo,
} from './styles';
import { logoutUser, GlobalContext, ACTIONS } from '../../store';

export default function Nav() {
  // Pass in "loggedIn" and use it to conditionally render buttons using ternary statement
  const { authStore, authDispatch, modalDispatch } = useContext(GlobalContext);
  const { loggedIn } = authStore;

  const handleLogOutSubmit = async () => {
    console.log('*** LOGGING OUT ****');
    try {
      await logoutUser(authDispatch);
    } catch (error) {
      // Error handling if the user is unable to log out
      console.log(error);
    }
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
          onClick={modalDispatch({ type: ACTIONS.LOGIN_MODAL })}
        >
          Log in
        </Button>
        )}

          {!loggedIn
        && (
        <Button
          type="button"
          onClick={modalDispatch({ type: ACTIONS.SIGNUP_MODAL })}
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
