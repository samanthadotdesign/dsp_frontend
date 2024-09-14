import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { Badges } from '../Category/styles';
import FigmaSVG from './figma.svg';
import HeartSVG from './heart.svg';
import CollectSVG from './collect.svg';

const sketch = (p5) => {
  let badges = [];

  p5.preload = () => {
    const figma = p5.loadImage(FigmaSVG);
    const heart = p5.loadImage(HeartSVG);
    const collect = p5.loadImage(CollectSVG);
    badges = [figma, heart, collect];
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    if (badges.length > 0) {
      for (let i = 0; i < badges.length; i += 1) {
        badges[i] = {
          image: badges[i],
          xPosition: p5.random(p5.windowWidth),
          yPosition: p5.random(p5.windowHeight),
          xSpeed: p5.random(1, 2),
          ySpeed: p5.random(3, 4),
        };
      }
    }
  };

  p5.draw = () => {
    p5.clear();

    if (badges.length > 0) {
      for (let i = 0; i < badges.length; i += 1) {
        p5.image(badges[i].image, badges[i].xPosition, badges[i].yPosition);

        if (badges[i].xPosition > p5.windowWidth - 100 || badges[i].xPosition < 0) {
          badges[i].xSpeed *= -1;
        }
        if (badges[i].yPosition > p5.windowHeight - 50 || badges[i].yPosition < 50) {
          badges[i].ySpeed *= -1;
        }
        badges[i].xPosition += badges[i].xSpeed;
        badges[i].yPosition += badges[i].ySpeed;
      }
    }
  };
};

export const Animation = () => (
  <>
    <Badges>
      <ReactP5Wrapper sketch={sketch} />
    </Badges>
  </>
);
