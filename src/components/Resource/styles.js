import styled from 'styled-components';
import { Input, SecondaryButton } from '../../styles';

export const H2 = styled.h2`
  font-family: 'Atkinson Bold';
  font-size: 16px;
  margin-bottom: 8px;

  @media screen and (max-width: 550px) {
    font-size: 22px;
    margin-bottom: 16px;
  }
`;

export const ResourceDiv = styled.div`
  visibility: hidden;
  padding: 14px;
  font-size: 14px;
  background-color: #fff;
  color: #000;
  border: 1.5px solid #000;
  width: 250px;
  height: fit-content;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-20%);
  z-index: 5;

  @media screen and (max-width: 550px) {
    width: 90vw;
    position: fixed;
    top: 30vh;
    transform: translateX(-50%);
    padding: 24px 16px;
    font-size: 16px;
  }
`;

export const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
  width: 100%;

  @media screen and (max-width: 550px) {
    margin-bottom: 24px 0;
  }
`;

export const LI = styled.li`
  text-underline: none;

  @media screen and (max-width: 550px) {
    margin: 8px 0;
  }
`;

export const Link = styled.a`
  text-decoration: none;

  &:visited {
    color: #6292EF;
  }

  &:hover {
    color: #4B4B45;
  }
`;

export const Submit = styled(SecondaryButton)`
  max-width: 100px;
`;

export const ButtonFieldset = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ResourceInput = styled(Input)`
  border: 1.5px solid #000;

  &:focus {
    border-color: #5552FF;
  }
`;

export const Favicon = styled.div`
  height: 20px;
  width: 20px;
`;
