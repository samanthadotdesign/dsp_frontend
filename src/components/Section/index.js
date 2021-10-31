import React, { useState, useEffect, useContext } from 'react';
import { getUserResources, getSectionData, GlobalContext } from '../../store';
import Skill from '../Skill';
import Resource from '../Resource/Resource';
import { Grid, SectionDiv, HoverResourceDiv } from './styles';
import { H1 } from '../../styles';

export default function Section({
  sectionId,
  sectionName,
}) {
  const { authStore, dashboardStore, dashboardDispatch } = useContext(GlobalContext);
  const { userId } = authStore;
  const { skills, sectionSkills } = dashboardStore;

  // On load, print all the skills for each section
  // For each section, get all the categoryId
  // section 0 = [0], section 1 = [1, 2, 3], section 2 = [4, 5]
  useEffect(async () => {
    await getSectionData(dashboardDispatch, skills, sectionId, userId);
  }, []);

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
        {/* <Grid className="grid"> */}
        {/* Map an array of skill objects into divs */}
        {/* {sectionSkills.map((skill, index) => (
            <HoverResourceDiv
              onPointerOver={() => handlePointerOver(index)}
            > */}
        {/* <Skill
                skillName={skill.skillName}
                skillImg={skill.skillImg}
                skillCompleted={skillCompletedArr.includes(skill.id)}
              /> */}
        {/* Todo: remove hoverresourcediv styled component & conditionally render the resource div */}
        {/* <Resource
                skillId={skill.id}
                skillName={skill.skillName}
                resourceSkills={resourceSkills}
                setResourceSkills={setResourceSkills}
                skillCompletedArr={skillCompletedArr}
                skillCompleted={skillCompletedArr.includes(skill.id)}
                categoriesCompleted={categoriesCompleted}
                setSkillCompleted={setSkillCompleted}
                setCategoriesCompleted={setCategoriesCompleted}
              />
            </HoverResourceDiv>
          ))} */}
        {/* </Grid> */}

      </SectionDiv>
    </>
  );
}
