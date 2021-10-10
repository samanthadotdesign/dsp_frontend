import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skill from '../Skill';
import Resource from '../Resource/Resource';
import { Grid, SectionDiv, HoverResourceDiv } from './styles';
import { H1 } from '../../styles';

export default function Section({
  id, sectionName, skills, categoriesCompleted, setCategoriesCompleted,
}) {
  // sectionSkills = [ { skillName: ..., skillImg: ..., completed: True }, {} ]
  const [sectionSkills, setSectionSkills] = useState([]);
  const [resourceSkills, setResourceSkills] = useState([]);
  const [skillCompletedArr, setSkillCompleted] = useState([]);
  const [skillsHoverState, setSkillsHoverState] = useState([]);

  // On load, print all the skills for each section
  // For each section, get all the categoryId
  // section 0 = [0], section 1 = [1, 2, 3], section 2 = [4, 5]
  useEffect(() => {
    axios.get(`/category-id/${id}`).then((result) => {
      const { categoryIds, skillIdsCompleted } = result.data;

      // Set skill ids completed so we can set it inside the skill boolean
      setSkillCompleted(skillIdsCompleted);
      // Get all the skills for each section
      const skillsInCategories = skills.filter((skill) => categoryIds.includes(skill.categoryId));

      const temporalSectionSkills = new Array(skillsInCategories.length).fill(false);

      // Setting the conditions for muted/colored
      setSectionSkills(skillsInCategories);
      setSkillsHoverState(temporalSectionSkills);
      console.log('********* SECTION SKILLS *******');
      console.log(skillsInCategories);
    });
  }, [skills]);

  // On load, get all the resources
  // Find the resources via skill id
  useEffect(() => {
    axios.get('/resources').then((result) => {
      setResourceSkills(result.data);
    });
  }, []);

  const handlePointerOver = (index) => {
    const tempArray = [...new Array(sectionSkills.length).fill(false)];
    tempArray[index] = true;
    console.log('*** TEMP ARRAY*** ');
    console.log(tempArray);
    setSkillsHoverState(tempArray);
  };

  return (
    <>
      <SectionDiv id={id}>
        <H1>{sectionName}</H1>
        {/* For every section, create a grid for all the skills with that section id */}
        <Grid className="grid">
          {/* Map an array of skill objects into divs */}
          {sectionSkills.map((skill, index) => (
            <HoverResourceDiv
              onPointerOver={() => handlePointerOver(index)}
            >
              <Skill
                skillName={skill.skillName}
                skillImg={skill.skillImg}
                skillCompleted={skillCompletedArr.includes(skill.id)}

              />
              {/* Todo: remove hoverresourcediv styled component & conditionally render the resource div */}
              <Resource
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
          ))}
        </Grid>

      </SectionDiv>
    </>
  );
}
