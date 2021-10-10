import React from 'react';
import { Figure, Img, Figcaption } from './styles';

export default function Skill({
  skillName, skillImg, skillCompleted,
}) {
  return (
    <>
      <Figure>
        <Img
          src={skillImg}
          alt={skillName}
          $skillCompleted={skillCompleted}
        />
        <Figcaption>{skillName}</Figcaption>
      </Figure>
    </>
  );
}
