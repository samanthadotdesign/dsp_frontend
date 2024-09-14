import React, { useContext } from 'react';
import {
  Formik, Form, useField,
} from 'formik';
import * as Yup from 'yup';
import {
  ButtonFieldset, ResourceInput, Submit, H2,
} from './styles';
import { Label, Error } from '../../styles';
import { addNewResource, GlobalContext } from '../../store';

const InputComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Label>
      {label}
      :
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
      <ResourceInput {...field} {...props} />
    </Label>
  );
};

export default function ResourceForm({
  skillId,
  setResourceForm,
  setAddResourceBtn,
}) {
  const { dashboardDispatch } = useContext(GlobalContext);

  const schema = Yup.object().shape({
    title: Yup.string().required(' Give your resource a title :)'),
    link: Yup.string().required(' Add a link to remember'),
  });

  const handleAddResource = (values) => {
    const { title, link } = values;
    addNewResource(dashboardDispatch, title, link, skillId);
    setResourceForm(true);
    setAddResourceBtn(true);
  };

  const handleCancelForm = () => {
    setResourceForm(false);
    setAddResourceBtn(true);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          link: '',
        }}
        onSubmit={(values) => handleAddResource(values)}
        validationSchema={schema}
      >
        {() => (
          <Form>
            <H2>Add to Resources</H2>
            <InputComponent name="title" type="text" label="Title" autoComplete="off" />
            <InputComponent name="link" type="text" label="Link" autoComplete="off" />
            <ButtonFieldset>
              <Submit type="button" onClick={handleCancelForm}>Cancel</Submit>
              <Submit type="button">Submit</Submit>
            </ButtonFieldset>
          </Form>
        )}
      </Formik>
    </>
  );
}
