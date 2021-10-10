import React from 'react';
import {
  Formik, Form, useField,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  ButtonFieldset, ResourceInput, Submit, H2,
} from './styles';
import { Label, Error } from '../../styles';

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
  resourceSkills, setResourceSkills, skillId, setResourceForm, setAddResourceBtn,
}) {
  const schema = Yup.object().shape({
    title: Yup.string().required(' Give your resource a title :)'),
    link: Yup.string().required(' Add a link to remember'),
  });

  console.log('******* DEFAULT RESOURCE SKILLS');
  console.log(resourceSkills);

  const handleAddResource = (values) => {
    const { title, link } = values;
    console.log('****** inside handle add resource');

    axios.post('/add-resource', { title, link, skillId }).then((result) => {
      /* resourceSkills = {
        1: [ { name ... }, {}, {}],
        2: [ { name ... }, {}, {}],
      }
      resourceSkills[1] = [{name...},{},{}]
      resourceSkills[10] -> key 10 doesn't even exist
      */
      console.log(result.data);
      if (resourceSkills[skillId]) {
        resourceSkills[skillId].push({ name: title, link });
      } else {
        resourceSkills[skillId] = [{ name: title, link }];
      }
      setResourceSkills({ ...resourceSkills });
      setResourceForm(false);
      setAddResourceBtn(true);
    });
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
            <H2>Add Resources To Your List</H2>
            <InputComponent name="title" type="text" label="Title" autoComplete="off" />
            <InputComponent name="link" type="text" label="Link" autoComplete="off" />
            <ButtonFieldset>
              <Submit type="button" onClick={handleCancelForm}>Cancel</Submit>
              <Submit type="submit">Submit</Submit>
            </ButtonFieldset>
          </Form>
        )}
      </Formik>
    </>
  );
}
