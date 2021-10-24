import React, { useContext } from 'react';
import { GlobalContext } from '../../store';
import ModalContainer from './ModalContainer';
import { SignUpForm, LogInForm, ErrorForm } from '../Form';

export default function Modal() {
  const { modalStore } = useContext(GlobalContext);
  const { signupModal, loginModal, errorModal } = modalStore;
  return (
    <>
      {signupModal && (
      <ModalContainer>
        <SignUpForm />
      </ModalContainer>
      )}
      {loginModal && (
      <ModalContainer>
        <LogInForm />
      </ModalContainer>
      )}
      {errorModal && (
      <ModalContainer>
        <ErrorForm />
      </ModalContainer>
      )}
    </>
  );
}
