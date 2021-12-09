import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext, addNewSkill, ACTIONS } from '../../store';
import ResourceForm from './ResourceForm';
import {
  H2, ResourceDiv, UL, LI, Link,
} from './styles';
import { SecondaryButton } from '../../styles';

export default function Resource({ skill }) {
  const { id: skillId, skillName, isCompleted } = skill;
  const {
    dashboardDispatch, dashboardStore, authStore, modalDispatch,
  } = useContext(GlobalContext);
  const { resources, skillIdsCompleted } = dashboardStore;
  const { userId, loggedIn } = authStore;

  const [resourceForm, setResourceForm] = useState(false);
  const [addResourceBtn, setAddResourceBtn] = useState(true);
  const [skillCompleted, setSkillCompleted] = useState(false);
  const [resourceModalVisible, setResourceModalVisible] = useState(false);

  // resourcesForSkillId is an array of objects [{ name: ... link: ...}, {}]
  const resourcesForSkillId = resources[skillId];

  const checkSkillCompleted = () => skillIdsCompleted.includes(skillId);

  const handleSkillCompleted = () => {
    // If user is logged in, add the skill to the user's account
    if (loggedIn) {
      console.log('Add new skill to my database');
      addNewSkill(dashboardDispatch, userId, skillId, skillCompleted);
    } else {
      // If user is not logged in, show login modal
      modalDispatch({ type: ACTIONS.LOGIN_MODAL });
    }
  };

  useEffect(() => {
    const response = checkSkillCompleted();

    setSkillCompleted(response);
  }, [skillIdsCompleted]);

  //   axios.put('/skill', { skillId, skillCompleted }).then((result) => {
  //     const { currentCategoryId, currentCategory, categoryIsComplete } = result.data;

  //
  //      */
  //     if (skillCompleted) {
  //       const skillsArray = skillCompletedArr.filter((id) => id != skillId);
  //       setSkillCompleted(skillsArray);

  //       // categoriesCompleted is an array of objects
  //       // We only modify the categories completed list if the categoriesCompleted array isn't empty
  //       if (!categoryIsComplete && categoriesCompleted.length > 0) {
  //         const categoriesArray = categoriesCompleted.filter(
  //           (category) => category.id !== currentCategoryId,
  //         );
  //         console.log('running inside when categories length is greater than 0');
  //         setCategoriesCompleted(categoriesArray);
  //       }

  //     /* If the skill is not yet completed,
  //     the user is clicking to "complete skill */
  //     } else {
  //       setSkillCompleted([...skillCompletedArr, skillId]);

  //       /* categoryIsComplete comes from the backend response
  //       If categoryIsComplete, add new categoryId to the categoriesCompleted */
  //       if (categoryIsComplete) {
  //         // If there are existing completed categories, spread the array and add to it
  //         if (categoriesCompleted.length > 0) {
  //           setCategoriesCompleted([...categoriesCompleted, currentCategory]);
  //           console.log('adding to categories array');
  //         } else {
  //           setCategoriesCompleted([currentCategory]);
  //           console.log('replacing categories array');
  //         }
  //       }
  //     }
  //   });
  // };

  // // Add the new inline fields for user to add the resource
  // const handleShowForm = () => {
  //   setResourceForm(true);
  //   setAddResourceBtn(false);
  // };

  // const toggleResourceModal = () => {
  //   setResourceModalVisible(false);
  // };

  // If skill is complete, the copy is Uncomplete Skill
  return (
    <ResourceDiv
      className="resource"
    >
      <H2>{skillName}</H2>
      <UL>
        {resourcesForSkillId && resourcesForSkillId.map((resource, index) => (
          <LI key={`resource-${index}`}>
            <Link href={resource.link} target="_blank">
              {resource.name}
            </Link>
          </LI>
        ))}
      </UL>

      {resourceForm
      && (
      <ResourceForm
        skillId={skillId}
        setResourceForm={setResourceForm}
        setAddResourceBtn={setAddResourceBtn}
      />
      )}

      {addResourceBtn && (
        <SecondaryButton
          type="button"
          // onClick={handleShowForm}
        >
          Add Resource
        </SecondaryButton>
      )}

      <SecondaryButton onClick={handleSkillCompleted}>
        {skillCompleted ? 'Uncomplete Skill' : 'Complete Skill'}
      </SecondaryButton>
    </ResourceDiv>

  );
}
