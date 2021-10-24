import React, { useContext } from 'react';
import {
  BG, Modal, CloseDiv, Span,
} from './styles';
import { ACTIONS, GlobalContext } from '../../store';

const ModalComponent = ({ children }) => {
  const { modalDispatch } = useContext(GlobalContext);
  const toggleClose = () => {
    modalDispatch({ type: ACTIONS.CLOSE_MODALS });
  };

  const Close = () => (
    <CloseDiv>
      <Span onClick={toggleClose}>&times;</Span>
    </CloseDiv>
  );

  return (
    <>
      <BG onClick={toggleClose} />
      <Modal>
        <Close />
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
