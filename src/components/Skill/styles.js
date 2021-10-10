import styled from 'styled-components';

export const Figure = styled.figure`
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const Img = styled.img`
  width: 72px;
  object-fit: cover;
  filter: ${({ $skillCompleted }) => (($skillCompleted === true) ? 'none' : 'grayscale(100%) brightness(120%)')};
`;

export const Figcaption = styled.figcaption`
  font-family: 'Atkinson Regular';
  font-size: 14px;
  text-align: center;
`;
