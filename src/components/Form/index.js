import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import axios from 'axios';
import {
  Submit, Container, H3, ImgDiv,
} from './styles';
import {
  Label, Error, Input, P, ButtonLink,
} from '../../styles';
import ErrorCat from './error.svg';

// Field hook from Formik to create reusable input component
const InputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Label>
      {label}
      :
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
      <Input {...field} {...props} />
    </Label>
  );
};

// Error handling
export const ErrorForm = ({ toggleSignUpModal, toggleLogInModal }) => (
  <Container>
    <ImgDiv>
      <img alt="Error" src={ErrorCat} />
    </ImgDiv>
    <H3>Sorry, we didn't catch that.</H3>
    <Submit onClick={toggleSignUpModal}>Create new account</Submit>
    <ButtonLink onClick={toggleLogInModal}>Try logging in again</ButtonLink>
  </Container>
);

// Sign up modal
export const SignUpForm = ({
  setLoggedIn, toggleSignUpModal, toggleLogInModal, toggleErrorModal,
}) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(' Maybe a fantasy title?'),
    email: Yup.string().email(' Oops! Is that valid?').required(' We need this :('),
    password: Yup.string().required(' We need this :('),
  });

  // Send to database
  // values = {name... email...password }
  const handleSignUpSubmit = (values) => {
    axios.post('/signup', values).then((result) => {
      // result.data will give us the status codes
      if (result.data === 'OK') {
        toggleSignUpModal();
        setLoggedIn(true);
      }
      // Handle incorrect signup
      else {
        toggleErrorModal();
      }
    });
  };

  return (
    <Container>
      <H3>Sign up</H3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleSignUpSubmit(values)}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <InputComponent name="name" type="text" label="Name" autoComplete="off" />
            <InputComponent name="email" type="email" label="Email" autoComplete="off" />
            <InputComponent name="password" type="password" label="Password" autoComplete="off" />
            <Submit type="submit">Sign up</Submit>
          </Form>
        )}
      </Formik>
      <P>Already have an account? </P>
      <ButtonLink onClick={toggleLogInModal}>
        Log in instead
      </ButtonLink>
    </Container>
  );
};

export const LogInForm = ({
  setLoggedIn, toggleLogInModal, toggleSignUpModal, toggleErrorModal,
}) => {
  const schema = Yup.object().shape({
    email: Yup.string().email(' Oops! Is that valid?').required(' We need this :('),
    password: Yup.string().required(' We need this :('),
  });

  // Send to database
  const handleLogInSubmit = (values) => {
    axios.post('mybackend.heroku.com/login', values).then((result) => {
      if (result.status === 200) {
        toggleLogInModal();
        setLoggedIn(true);
      }
      // Handling the errors for not correct login
      if (result.status === 401) {
        console.log(result.data);
        console.log(result);
        toggleErrorModal();
      }
    });
  };

  return (
    <Container>
      <H3>Log in</H3>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleLogInSubmit(values)}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <InputComponent name="email" type="email" label="Email" autoComplete="off" />
            <InputComponent name="password" type="password" label="Password" autoComplete="off" />
            <Submit type="submit">Log in</Submit>
          </Form>
        )}
      </Formik>
      <P>No account? </P>
      <ButtonLink onClick={toggleSignUpModal}>
        Create one instead
      </ButtonLink>
    </Container>
  );
};
