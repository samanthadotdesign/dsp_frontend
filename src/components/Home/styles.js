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

export const Divider = styled.div`
  height: 0.5px;
  background-color: #ccc;
  width: 100%;
  margin: 16px 0;
}`;
