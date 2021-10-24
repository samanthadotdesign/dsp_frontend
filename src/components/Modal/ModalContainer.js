import React, { useContext } from 'react';
import {
  BG, Modal, CloseDiv, Span,
} from './styles';
import { ACTIONS, GlobalContext } from '../../store';

const Close = () => {
  const { modalDispatch } = useContext(GlobalContext);
  return (
    <CloseDiv>
      <Span onClick={modalDispatch({ type: ACTIONS.CLOSE_MODALS })}>&times;</Span>
    </CloseDiv>
  );
};

const ModalComponent = ({ children }) => {
  const { modalDispatch } = useContext(GlobalContext);
  return (
    <>
      <BG onClick={modalDispatch({ type: ACTIONS.CLOSE_MODALS })} />
      <Modal>
        <Close />
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
