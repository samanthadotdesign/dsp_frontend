import React from 'react';
import { Figure, Img, Figcaption } from './styles';

export default function Skill({
  skill,
}) {
  const { skillName, skillImg, isCompleted } = skill;
  return (
    <>
      <Figure>
        <Img
          src={skillImg}
          alt={skillName}
          $skillCompleted={isCompleted}
        />
        <Figcaption>{skillName}</Figcaption>
      </Figure>
    </>
  );
}
