import React, { useContext } from 'react';
import { GlobalStyle, P, TextLink } from '../../styles';
import { Section, Em } from './styles';
import { Animation } from './Animation';
import { GlobalContext } from '../../store';

export default function Home() {
  const { authStore } = useContext(GlobalContext);
  const { loggedIn } = authStore;

  return (
    <>
      <GlobalStyle />
      {!loggedIn && <Animation />}

      <Section>
        <P>
          <Em>Designer Starter Pack</Em>
          {' '}
          is a curated list of Figma skills by
          {' '}
          <TextLink href="http://samantha.design">Samantha Lee</TextLink>
          {' '}
          of Funding Societies.
          <br />
          <br />
          This list exists to better organize the list of skills I've come to know, like, and/or find interesting while working in product design.
        </P>
      </Section>
    </>
  );
}
