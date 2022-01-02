import { useRef, useContext } from 'react';
import Skill from '../Skill';
import Resource from './Resource';
import { HoverResourceDiv } from '../Section/styles';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { GlobalContext } from '../../store';

export default function HoverResource({
  skill, index, handlePointerOver, skillsHoverState,
}) {
  const { windowStore } = useContext(GlobalContext);
  const { width, isTouchDevice } = windowStore;
  // Creating one ref which is the target that useOnClickOutside hook
  // Executes shutting off the resource div visbility
  const target = useRef();
  useOnClickOutside(target, () => {
    if (skillsHoverState == index) {
      handlePointerOver(index, false);
    }
  });

  return (
    <HoverResourceDiv
      ref={target}
      onPointerOver={() => handlePointerOver(index, true)}
      onPointerLeave={() => {
        if (!isTouchDevice && width > 768) {
          handlePointerOver(index, false);
        }
      }}
      key={`hover-skill-${index}`}
    >
      <Skill
        skill={skill}
        key={`skill-${index}`}
      />
      {skillsHoverState == index ? (
        <Resource
          skillsHoverState={skillsHoverState}
          handlePointerOver={handlePointerOver}
          skill={skill}
          index={index}
          key={`resource-${index}`}
        />
      ) : null}

    </HoverResourceDiv>
  );
}
