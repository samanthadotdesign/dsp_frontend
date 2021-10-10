import styled from 'styled-components';
import { Button } from '../../styles';

export const Submit = styled(Button)`
  margin-top: 14px;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const H3 = styled.h3`
  font-size: 32px;
  margin-bottom: 32px;
  color: #000;
  font-family: "Atkinson Bold";
  text-align: center;
`;

export const ImgDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
