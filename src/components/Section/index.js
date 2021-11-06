import React, { useState, useEffect, useContext } from 'react';
import { boolean } from 'yup/lib/locale';
import { getUserResources, GlobalContext } from '../../store';
import Skill from '../Skill';
import Resource from '../Resource/Resource';
import { Grid, SectionDiv, HoverResourceDiv } from './styles';
import { H1 } from '../../styles';

// For each section component, print the skills and its resources
export default function Section({
  sectionId,
  sectionName,
}) {
  const { authStore, dashboardStore, dashboardDispatch } = useContext(GlobalContext);
  const { categories, skillIdsCompleted, skills } = dashboardStore;

  // On initial load, skillsHoverStsate is undefined
  const [skillsHoverState, setSkillsHoverState] = useState();

  // On load, print all the skills for each section
  // section -> category (sectionId) -> skill
  // array of categories in the section [ { id, categoryName ... sectionId }]
  const categoriesInSection = categories.filter((category) => category.sectionId === sectionId);

  // array of skills in the section
  const skillsInSection = skills.filter((skill) => {
    const { categoryId } = skill;
    const singleSkillInCategory = categoriesInSection.find((category) => category.id === categoryId);
    return singleSkillInCategory;
  });

  // Color skills that are completed
  const populatedSkills = skillsInSection.map((skill) => {
    const condition = skillIdsCompleted.find((skillId) => skillId === skill.id);
    if (condition) {
      return { ...skill, isCompleted: true };
    }
    return skill;
  });

  const handlePointerOver = (index, bool) => {
    setSkillsHoverState(bool ? index : undefined);
  };

  return (
    <>
      <SectionDiv id={sectionId}>
        <H1>{sectionName}</H1>
        {/* For every section, create a grid for all the skills with that section id */}
        <Grid className="grid">
          {/* Map an array of skill objects into divs */}
          {populatedSkills.map((skill, index) => (
            <HoverResourceDiv
              onPointerOver={
              () => handlePointerOver(index, true)
}
              onPointerLeave={() => handlePointerOver(index, false)}
            >
              <Skill
                skill={skill}
                key={`skill-${index}`}
              />
              {skillsHoverState == index ? (
                <Resource
                  skill={skill}
                  key={`resource-${index}`}
                />
              ) : null}
            </HoverResourceDiv>
          ))}
        </Grid>
      </SectionDiv>
    </>
  );
}
