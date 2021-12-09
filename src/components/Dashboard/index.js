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
      {categoriesCompleted && categoriesCompleted.map((categoryCompleted, index) => (
        <Category
          key={`category-${index}`}
        />
      ))}

      {sections && sections.map((section, index) => (
        <Section
          sectionId={section.id}
          sectionName={section.sectionName}
          key={`section-${index}`}
        />
      ))}
    </div>
  );
}
