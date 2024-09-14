import React, { useContext } from 'react';
import {
  GlobalStyle, P, TextLink, ThinSpacer,
} from '../../styles';
import { Section, Em, Divider } from './styles';
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
          <TextLink
            href="http://samantha.design"

          >
            Samantha Lee

          </TextLink>
          {' '}
          of Funding Societies.
          <br />
          <br />
          This list exists to better organize the list of skills I've come to know, like, and/or find interesting while working in product design.
        </P>
        <Divider />
        <P>
          <Em>Colophone</Em>
          <ThinSpacer />
          {' '}
          Fonts in use:
          {' '}
          <TextLink
            href="https://brailleinstitute.org/freefont"
            target="_blank"
            rel="noopener"
          >
            Atkinson Hyperlegible
          </TextLink>
          {' '}
          designed by Braille Institute to increase legibility and readability for people with low vision.
        </P>
      </Section>
    </>
  );
}
