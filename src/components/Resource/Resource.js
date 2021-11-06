import React, { useState, useEffect, useContext } from 'react';
import ResourceForm from './ResourceForm';
import {
  H2, ResourceDiv, UL, LI, Link,
} from './styles';
import { SecondaryButton } from '../../styles';

// Add resource emoji or favicon

// skillId,
// skillName,
// resourceSkills,
// setResourceSkills,
// skillCompletedArr,
// skillCompleted,
// setSkillCompleted,
// categoriesCompleted,
// setCategoriesCompleted,

// skillCompleted is a boolean describing if the skill is completed or not
// skillCompletedArr is array of skillIds of completed skills

export default function Resource({ skill }) {
  // const { skillName, skillId, isCompleted } = skill;
  // const [resourceForm, setResourceForm] = useState(false);
  // const [addResourceBtn, setAddResourceBtn] = useState(true);
  // const [resourceModalVisible, setResourceModalVisible] = useState(false);

  // const resourcesForSkillId = resourceSkills[skillId];

  // const { height, width } = useWindowDimensions();
  // const showModalView = (width < 550);

  // const handleClick = () => {
  //   axios.put('/skill', { skillId, skillCompleted }).then((result) => {
  //     const { currentCategoryId, currentCategory, categoryIsComplete } = result.data;

  //     /* If the skill is already completed before the handleClick,
  //     the user is clicking to "uncomplete" the skill */
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
      <h1>working resource</h1>
      {/* <H2>{skillName}</H2>
      <UL>
        {resourcesForSkillId && resourcesForSkillId.map((resource) => (
          <LI>
            <Link href={resource.link} target="_blank">
              {resource.name}
            </Link>
          </LI>
        ))}
      </UL>

      {resourceForm
      && (
      <ResourceForm
        resourceSkills={resourceSkills}
        setResourceSkills={setResourceSkills}
        skillId={skillId}
        setResourceForm={setResourceForm}
        setAddResourceBtn={setAddResourceBtn}
      />
      )}

      {addResourceBtn && (
        <SecondaryButton
          type="button"
          onClick={handleShowForm}
        >
          Add Resource
        </SecondaryButton>
      )}

      <SecondaryButton
        onClick={handleClick}
      >
        {skillCompleted ? 'Uncomplete Skill' : 'Complete Skill'}
      </SecondaryButton> */}
    </ResourceDiv>

  );
}
