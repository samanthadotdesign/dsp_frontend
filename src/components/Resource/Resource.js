import React, {
  useState, useContext,
} from 'react';
import { GlobalContext, addNewSkill, ACTIONS } from '../../store';
import ResourceForm from './ResourceForm';
import {
  H2, ResourceDiv, UL, LI, Link,
} from './styles';
import { SecondaryButton } from '../../styles';

export default function Resource({ index, skill, handlePointerOver }) {
  const { id: skillId, skillName } = skill;
  const {
    dashboardDispatch, dashboardStore, authStore, modalDispatch,
  } = useContext(GlobalContext);
  const { resources, skillIdsCompleted } = dashboardStore;
  const { userId, loggedIn } = authStore;

  const [resourceForm, setResourceForm] = useState(false);
  const [addResourceBtn, setAddResourceBtn] = useState(true);

  // resourcesForSkillId is an array of objects [{ name: ... link: ...}, {}]
  const resourcesForSkillId = resources[skillId];

  const isSkillCompleted = () => skillIdsCompleted.includes(skillId);

  const handleSkillCompleted = () => {
    // If user is logged in, add the skill to the user's account
    if (loggedIn) {
      addNewSkill(dashboardDispatch, skillId, userId, isSkillCompleted());
    } else {
      // If user is not logged in, show login modal
      handlePointerOver(index, false);
      modalDispatch({ type: ACTIONS.LOGIN_MODAL });
    }
  };

  const handleShowForm = () => {
    // If user is logged in, add the new inline fields for user to add the resource
    if (loggedIn) {
      setResourceForm(true);
      setAddResourceBtn(false);
    } else {
      modalDispatch({ type: ACTIONS.LOGIN_MODAL });
    }
  };

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
              <img
                alt={resource.name}
                src={`https://s2.googleusercontent.com/s2/favicons?domain=${resource.link}`}
              />
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
          onClick={handleShowForm}
        >
          Add Resource
        </SecondaryButton>
      )}

      <SecondaryButton onClick={handleSkillCompleted}>
        {isSkillCompleted() ? 'Uncomplete Skill' : 'Complete Skill'}
      </SecondaryButton>
    </ResourceDiv>

  );
}
