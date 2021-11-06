import React, { useContext } from 'react';
import { GlobalContext } from '../../store';
import Section from '../Section';
import Category from '../Category';

export default function Dashboard() {
  const { dashboardStore } = useContext(GlobalContext);
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
