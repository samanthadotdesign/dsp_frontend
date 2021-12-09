import React, { useContext, useState, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { GlobalContext } from '../../store';
import { Badges } from './styles';

const sketch = (p5, categoriesCompleted) => {
  // Badges is an array of preloaded images
  const badges = [];

  // Preload each image and then include it into the badges array
  p5.preload = () => {
    for (let i = 0; i < categoriesCompleted.length; i += 1) {
      const img = p5.loadImage(categoriesCompleted[i].categoryImg);
      badges.push(img);
    }
  };

  let xPosition;
  let yPosition;
  let xSpeed;
  let ySpeed;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    // Create bouncing badges on every page load using draw()
    if (badges.length > 0) {
      for (let i = 0; i < badges.length; i += 1) {
        badges[i] = {
          image: badges[i],
          xPosition: p5.random(p5.windowWidth),
          yPosition: p5.random(p5.windowHeight),
          xSpeed: p5.random(1, 2),
          ySpeed: p5.random(1, 3),
        };
      }
    }
  };

  // Redraw on canvas every single second
  p5.draw = () => {
    p5.clear();

    // Displays each image on the screen
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

// categoriesCompleted is an array of completed category objects for that user
export default function Category() {
  const { dashboardStore } = useContext(GlobalContext);
  const { categoriesCompleted } = dashboardStore;

  return (
    <>
      <Badges>
        <ReactP5Wrapper sketch={(p5) => { sketch(p5, categoriesCompleted); }} />
      </Badges>
    </>
  );
}
