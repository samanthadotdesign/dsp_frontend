import React, { useEffect, useContext } from 'react';
import { getData, GlobalContext } from '../../store';
import Section from '../Section';
import Category from '../Category';

export default function Dashboard() {
  const { authStore, dashboardStore, dashboardDispatch } = useContext(GlobalContext);
  const { loggedIn, userId } = authStore;
  const {
    sections,
    categoriesCompleted,
  } = dashboardStore;

  // Initializes on load all the info from the database
  useEffect(async () => {
    try {
      // If user is logged in, show user's dashboard data
      if (loggedIn) {
        await getData(dashboardDispatch, userId);
      }
      // If user isn't logged in, show all the dashboard data anyway
      else {
        await getData(dashboardDispatch, 1);
      }
    } catch (error) {
      console.log(error);
    }
  }, [loggedIn]);

  return (
    <div>
      {categoriesCompleted && <Category categoriesCompleted={categoriesCompleted} />}

      {sections && sections.map((section) => (
        <Section
          sectionId={section.id}
          sectionName={section.sectionName}
        />
      ))}
    </div>
  );
}
