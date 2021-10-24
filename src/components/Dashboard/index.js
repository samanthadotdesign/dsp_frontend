import React, { useEffect, useContext } from 'react';
import { getData, GlobalContext } from '../../store';
import Section from '../Section';
import Category from '../Category';

export default function Dashboard() {
  const { authStore, dashboardStore, dashboardDispatch } = useContext(GlobalContext);
  const { loggedIn } = authStore;

  const {
    sections,
    categories,
    skills,
    resources,
    categoriesCompleted,
    skillsCompleted,
  } = dashboardStore;

  // Initializes on load all the info from the database
  useEffect(async () => {
    try {
      await getData(dashboardDispatch);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {categoriesCompleted && <Category categoriesCompleted={categoriesCompleted} />}

      {sections && sections.map((section) => (
        <Section
          id={section.id}
          sectionName={section.sectionName}
          skills={skills}
          categoriesCompleted={categoriesCompleted}
          // setCategoriesCompleted={setCategoriesCompleted}
        />
      ))}
    </div>
  );
}
