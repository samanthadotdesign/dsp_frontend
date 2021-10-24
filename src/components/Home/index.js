import React from 'react';
import { GlobalStyle, P } from '../../styles';
import { Section, Em } from './styles';
import { Animation } from './Animation';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Animation />
      <Section>
        <P>
          <Em>Designer Starter Pack</Em>
          {' '}
          is a curated list of Figma skills by Samantha Lee of Funding Societies.
          <br />
          <br />
          This list exists to better organize the list of skills I've come to know, like, and/or find interesting while working in product design.
        </P>
      </Section>
    </>
  );
}
