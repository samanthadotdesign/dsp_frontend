import React, { useContext, useRef } from 'react';
import {
  BG, Modal, CloseDiv, Span,
} from './styles';
import { ACTIONS, GlobalContext } from '../../store';
import useOnClickOutside from '../../utils/useOnClickOutside';

const ModalComponent = ({ children }) => {
  const { modalDispatch } = useContext(GlobalContext);
  const toggleClose = () => {
    modalDispatch({ type: ACTIONS.CLOSE_MODALS });
  };

  // Toggling modal on close by clicking background
  // Bind ref to the modal that we want to close
  const ref = useRef();
  useOnClickOutside(ref, () => {
    toggleClose();
  });

  const Close = () => (
    <CloseDiv>
      <Span onClick={toggleClose}>&times;</Span>
    </CloseDiv>
  );

  return (
    <BG>
      <Modal ref={ref}>
        <Close />
        {children}
      </Modal>
    </BG>
  );
};

export default ModalComponent;
