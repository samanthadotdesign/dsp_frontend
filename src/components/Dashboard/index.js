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
