import styled from 'styled-components';

export const Logo = styled.img`
  z-index: 4;
  width: 250px;
`;

export const Button = styled.button`
  font-family: 'Atkinson Regular';
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.5s ease;

  margin-left: 14px;
  color: #000;
  font-size: 16px;

  &:hover {
    color: #ccc;
  }
`;

export const NavBar = styled.header`
  margin: 0;
  padding: 14px 24px;
  max-height: 60px;
  background-color: #fff;
  width: 100vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;

  z-index: 2;

  @media screen and (max-width: 550px) {
    padding-top: 48px;
    height: fit-content;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export const NavLinks = styled.nav`
  @media screen and (max-width: 550px) {
    margin-top: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }   
`;
