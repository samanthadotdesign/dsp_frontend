import styled from 'styled-components';

export const BG = styled.div`
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
  overflow: none;
`;

export const Modal = styled.div`
  background-color: #fff;
  margin: 12% auto; 
  padding: 24px;
  border: 2px solid #000;
  width: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;

  @media (max-width: 700px) {
    margin: 100% auto;
    transform: translateY(-50%);
  }
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 14px;
  padding: 8px 14px;
  cursor: pointer;
  color: #ccc;
  transition: color 0.5s ease;  

  &:hover
  &:focus {
    color: #000;
  }
`;

export const Span = styled.button`
  font-size: 28px;
  outline: none;
  background: none;
  border: 0;
  cursor: pointer;
  color: #ccc;
  transition: color 0.5s ease;  

  &:hover
  &:focus {
    color: #000;
  }
`;
