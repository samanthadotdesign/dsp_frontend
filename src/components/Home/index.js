import React from 'react';
import { GlobalStyle, P } from '../../styles';
import ModalContainer from '../Modal/ModalContainer';
import { SignUpForm, LogInForm, ErrorForm } from '../Form';
import { Section, Em } from './styles';
import { Animation } from './Animation';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Animation />

      {showSignUpModal && (
        <ModalContainer toggleModal={toggleSignUpModal}>
          <SignUpForm
            setLoggedIn={setLoggedIn}
            toggleSignUpModal={toggleSignUpModal}
            toggleLogInModal={toggleLogInModal}
            toggleErrorModal={toggleErrorModal}
          />
        </ModalContainer>
      )}

      {showLogInModal && (
      <ModalContainer toggleModal={toggleLogInModal}>
        <LogInForm
          setLoggedIn={setLoggedIn}
          toggleLogInModal={toggleLogInModal}
          toggleSignUpModal={toggleSignUpModal}
          toggleErrorModal={toggleErrorModal}
        />
      </ModalContainer>
      )}

      {showErrorModal && (
      <ModalContainer toggleModal={toggleErrorModal}>
        <ErrorForm
          toggleLogInModal={toggleLogInModal}
          toggleSignUpModal={toggleSignUpModal}
        />
      </ModalContainer>
      )}

      <Section>
        <P>
          <Em>Designer Starter Pack</Em>
          {' '}
          is a curated list of Figma skills by Samantha Lee of Funding Societies.
          <br />
          <br />
          This list exists to better organize the list of skills I've come to know, like, and/or find interesting while working in product design.
        </P>
      </Section>
    </>
  );
}
