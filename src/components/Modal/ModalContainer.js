import React from 'react';
import {
  BG, Modal, CloseDiv, Span,
} from './styles';

const Close = ({ toggleModal }) => (
  <>
    <CloseDiv>
      <Span onClick={toggleModal}>&times;</Span>
    </CloseDiv>
  </>
);

const ModalComponent = ({ toggleModal, children }) => (
  <>
    <BG onClick={toggleModal} />
    <Modal>
      <Close toggleModal={toggleModal} />
      {children}
    </Modal>
  </>
);

export default ModalComponent;
