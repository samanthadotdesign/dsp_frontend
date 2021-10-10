import styled from 'styled-components';

export const Section = styled.section`
  position: absolute;
  top: 60px;
  max-width: 350px;
  padding: 24px;

  @media screen and (max-width: 550px) {
    top:120px;
    align-items: center;
  }
`;

export const Em = styled.em`
  font-family: 'Atkinson Bold';
  font-style: normal;
  font-size: 16px;
`;
