import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import {
  Submit, Container, H3, ImgDiv,
} from './styles';
import {
  Label, Error, Input, P, ButtonLink,
} from '../../styles';
import ErrorCat from './error.svg';
import {
  addUser, loginUser, GlobalContext, ACTIONS,
} from '../../store';

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
export const ErrorForm = () => {
  const { modalDispatch } = useContext(GlobalContext);
  const toggleSignUpModal = () => {
    modalDispatch({ type: ACTIONS.SIGNUP_MODAL });
  };
  const toggleLogInModal = () => {
    modalDispatch({ type: ACTIONS.LOGIN_MODAL });
  };

  return (
    <Container>
      <ImgDiv>
        <img alt="Error" src={ErrorCat} />
      </ImgDiv>
      <H3>Sorry, we didn't catch that.</H3>
      <Submit onClick={toggleSignUpModal}>Create new account</Submit>
      <ButtonLink onClick={toggleLogInModal}>Try logging in again</ButtonLink>
    </Container>
  );
};

// Sign up modal
export const SignUpForm = () => {
  const { authDispatch, modalDispatch } = useContext(GlobalContext);

  const schema = Yup.object().shape({
    name: Yup.string().required(' Maybe a fantasy title?'),
    email: Yup.string().email(' Oops! Is that valid?').required(' We need this :('),
    password: Yup.string().required(' We need this :('),
  });

  const toggleLogInModal = () => {
    modalDispatch({ type: ACTIONS.LOGIN_MODAL });
  };

  // Send to database
  // values = {name... email...password }
  const handleSignUpSubmit = async (values) => {
    try {
      await addUser(authDispatch, values);
      await modalDispatch({ type: ACTIONS.CLOSE_MODALS });
    } catch (error) {
      console.log('error in signup found');
      console.log(error);
      await modalDispatch({ type: ACTIONS.ERROR_MODAL });
    }
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

export const LogInForm = () => {
  const { authDispatch, modalDispatch } = useContext(GlobalContext);

  const schema = Yup.object().shape({
    email: Yup.string().email(' Oops! Is that valid?').required(' We need this :('),
    password: Yup.string().required(' We need this :('),
  });

  const toggleSignUpModal = () => {
    modalDispatch({ type: ACTIONS.SIGNUP_MODAL });
  };

  // Send to database
  const handleLogInSubmit = async (values) => {
    try {
      const response = await loginUser(authDispatch, values);
      console.log('**** RESPONSE INSIDE LOGIN FORM****');

      const { userId, loggedIn } = response;

      // Set expiration for cookies
      const loggedInDate = Date.now();
      // Web storage API to store the cookie information
      localStorage.setItem('userId', userId);
      localStorage.setItem('loggedIn', loggedIn);
      localStorage.setItem('loggedInDate', loggedInDate);

      await modalDispatch({ type: ACTIONS.CLOSE_MODALS });
    } catch (error) {
      console.log(error);
      await modalDispatch({ type: ACTIONS.ERROR_MODAL });
    }
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
