import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../store';
import HoverResource from '../Resource/HoverResource';
import { Grid, SectionDiv } from './styles';
import { H1 } from '../../styles';

// For each section component, print the skills and its resources
export default function Section({
  sectionId,
  sectionName,
}) {
  const { authStore, dashboardStore, dashboardDispatch } = useContext(GlobalContext);
  const { categories, skillIdsCompleted, skills } = dashboardStore;
  const [populatedSkills, setPopulatedSkills] = useState([]);
  // On initial load, skillsHoverStsate is undefined,
  // only 1 skillHoverState can be shown at one time
  // Toggling between false and index of the hover div we want open
  const [skillsHoverState, setSkillsHoverState] = useState();

  // On load, print all the skills for each section
  // section -> category (sectionId) -> skill
  // array of categories in the section [ { id, categoryName ... sectionId }]
  const categoriesInSection = categories.filter((category) => category.sectionId === sectionId);

  // array of skills in the section
  const skillsInSection = skills.filter((skill) => {
    const { categoryId } = skill;
    const singleSkillInCategory = categoriesInSection.find(
      (category) => category.id === categoryId,
    );
    return singleSkillInCategory;
  });

  // Color skills that are completed, refresh when skill have been added
  useEffect(() => {
    const coloredSkills = skillsInSection.map((skill) => {
      const condition = skillIdsCompleted.find((skillId) => skillId === skill.id);
      if (condition) {
        return { ...skill, isCompleted: true };
      }
      return { ...skill, isCompleted: false };
    });
    setPopulatedSkills(coloredSkills);
  }, [skillIdsCompleted]);

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
            <HoverResource
              skillsHoverState={skillsHoverState}
              handlePointerOver={handlePointerOver}
              skill={skill}
              index={index}
            />
          ))}
        </Grid>
      </SectionDiv>
    </>
  );
}
