import React, { useState, useEffect, useContext } from 'react';
import { getUserResources, getSectionData, GlobalContext } from '../../store';
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

  // const handlePointerOver = (index) => {
  //   const tempArray = [...new Array(sectionSkills.length).fill(false)];
  //   tempArray[index] = true;
  //   console.log('*** TEMP ARRAY*** ');
  //   console.log(tempArray);
  //   setSkillsHoverState(tempArray);
  // };

  return (
    <>
      <SectionDiv id={sectionId}>
        <H1>{sectionName}</H1>
        {/* For every section, create a grid for all the skills with that section id */}
        <Grid className="grid">
          {/* Map an array of skill objects into divs */}
          {populatedSkills.map((skill, index) => (
            <Skill
              skill={skill}
              key={`skill-${index}`}
            />
          ))}
        </Grid>
      </SectionDiv>
    </>
  );
}
