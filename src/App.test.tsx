import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardSlider from './Component/CardSlider';


const testScroll = (button:HTMLElement, cardElement:HTMLElement,value:number) => {
  fireEvent.click(button);
  expect(cardElement.scrollLeft).toBe(value);
}


describe('CardSlider', () => {
  test('render cardslider component', () => {
    render(
      <CardSlider
        children={<div>hello</div>}
        styleColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )
  });

  test('Check for angle styles and responsiveness', () => {
    render(
      <CardSlider
        children={<div>hello</div>}
        styleColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )

    const leftAngle = screen.getByText(/left/i);
    const rightAngle = screen.getByText(/right/i);
  
    //test for background color
    expect(leftAngle).toHaveStyle('background-color: red');
    expect(rightAngle).toHaveStyle('background-color: ButtonFace');
  
    //test for color
    expect(leftAngle).toHaveStyle('color: white');
    expect(rightAngle).toHaveStyle('color: red');
  
    //test for mobile style
    expect(leftAngle).toHaveClass('mobile');
    expect(rightAngle).toHaveClass('mobile');

  });

  test('should be able to scroll card element when arrow button is clicked', () => {
    render(
      <CardSlider
        children={<div>hello</div>}
        styleColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )
    const cardElement = screen.getByTestId(/sliderElement/i);
    const leftButton = screen.getByRole("button", {name: /left/i});
    const rightButton =  screen.getByRole("button", {name: /right/i});
   
    //test for scroll when button is clicked
    expect(cardElement.scrollLeft).toBe(0);

    testScroll(rightButton, cardElement, 500);
    testScroll(rightButton, cardElement, 1000);
    testScroll(rightButton, cardElement, 1500);

    testScroll(leftButton, cardElement, 1000);
    testScroll(leftButton, cardElement, 500);
    testScroll(leftButton, cardElement, 0);


    //test for scroll on manual scroll
    fireEvent.scroll(cardElement, {target: { scrollLeft: 500}});
    expect(cardElement.scrollLeft).toBe(500);
  });

  test('change button style on hover', () => {
    render(
      <CardSlider
        children={<div>hello</div>}
        styleColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )
    const leftAngle = screen.getByText(/left/i);
    const rightAngle = screen.getByText(/right/i);
  
    fireEvent.mouseOver(leftAngle);
    expect(leftAngle).toHaveStyle('color: white; background-color: red');

    fireEvent.mouseOver(rightAngle);
    expect(rightAngle).toHaveStyle('color: white; background-color: red');
  });

  test('change button style on each end', () => {
    render(
      <CardSlider
        children={<div>hello</div>}
        styleColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )

    const cardElement = screen.getByTestId(/sliderElement/i);
    const leftAngle = screen.getByText(/left/i);
    const rightAngle = screen.getByText(/right/i);
    

    fireEvent.scroll(cardElement, {target: { scrollLeft: -1}});
    expect(leftAngle).toHaveStyle('color: white; background-color: red');
    fireEvent.scroll(cardElement, {target: { scrollLeft: 1}});
    expect(leftAngle).toHaveStyle('color: red; background-color: ButtonFace');
  });
});
 