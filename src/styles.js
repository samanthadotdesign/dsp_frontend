import styled, { createGlobalStyle, css } from 'styled-components';
import AtkinsonBold from './fonts/Atkinson-Hyperlegible-Bold-102a.woff2';
import AtkinsonRegular from './fonts/Atkinson-Hyperlegible-Regular-102a.woff2';

const dark = '#000';
const light = '#fff';
const gray = '#ccc';

const fonts = css`
  @font-face {
    font-family: 'Atkinson Regular';
    src: url(${AtkinsonRegular}) format('woff2');
    font-style: normal;
  } 

  @font-face {
    font-family: 'Atkinson Bold';
    src: url(${AtkinsonBold}) format('woff2');
    font-style: bold;
  } 

  html {
    font-family: 'Atkinson Regular';
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }
  ${fonts}
`;

export const AbsoluteCenter = css`
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const Button = styled.button`
  font-family: 'Atkinson Regular';
  font-size: 16px;
  padding: 8px;
  width: 100%;
  color: ${light};
  background-color: ${dark};
  transition: all 0.5s ease-in;
  outline: none;
  border: none;
  margin-bottom: 16px;
  text-align: left;
  cursor: pointer;

  @media screen and (max-width: 550px) {
    padding: 12px;
  }

  &:hover {
    color: ${dark};
    background-color: ${gray}
  }
`;

export const SecondaryButton = styled.button`
  font-family: 'Atkinson Regular';
  font-size: 16px;
  width: 100%;
  padding: 4px;
  font-size: 14px;
  background-color: ${light};
  outline: none;
  border: 1.5px solid ${dark};
  text-align: center;
  cursor: pointer;
  margin-top: 14px;

  &:hover {
    background-color: ${gray};
  }

  @media screen and (max-width: 550px) {
    padding: 8px;
  }
`;

export const Input = styled.input`
  font-family: 'Atkinson Regular';
  font-size: 16px;
  border: 2px solid #000;
  outline: #000;
  background: #fff;
  color: #000;
  padding: 8px;
  margin-bottom: 14px;
  width: 100%;

  &:focus {
    border-color: #000;
  }

  @media (max-width: 700px) {
    padding: 12px;
    margin-bottom: 16px;
  }
`;

export const Textarea = styled.textarea`
  font-family: 'Atkinson Regular';
  font-size: 16px;
  border: 2px solid #000;
  outline: #000;
  background: #fff;
  color: #000;
  padding: 8px;
  margin-bottom: 14px;
  width: 100%;
  resize: none;

  &:focus {
    border-color: #000;
  }

  @media (max-width: 700px) {
    padding: 12px;
    margin-bottom: 16px;
  }
`;

export const P = styled.p`
  font-family: 'Atkinson Regular';
  font-size: 16px;
  display: inline;
`;

export const ButtonLink = styled.button`
  display: inline;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.5s ease;
  color: #000;
  font-family: 'Atkinson Regular';
  font-size: 16px;

  &:hover {
    color: #ccc;
  }
`;

export const Label = styled.label`
  font-family: "Atkinson Regular"
  font-size: 14px;
`;

export const Error = styled.span`
  color: #e26e2d;
  font-family: "Atkinson Regular";
  font-size: 14px;
`;

export const H1 = styled.h1`
  font-family: 'Atkinson Bold';
  font-size: 32px;
  margin-bottom: 16px;
`;
