import styled from 'styled-components';

export const Grid = styled.div`
  width: 75vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, 72px);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 16px;
  grid-auto-flow: dense;
  align-items: start;
  justify-content: center;
  padding: 14px) 0;

  @media screen and (max-width: 550px) {
    width: 100vw;
    padding: 8px;
  }
`;

export const SectionDiv = styled.div`
  padding: 24px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 550px) {
    padding: 0 16px 16px 16px;
  }
`;

export const HoverResourceDiv = styled.div`
  position: relative;
`;
