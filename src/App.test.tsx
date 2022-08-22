import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import CardSlider from './Component/CardSlider';


describe('App', () => {
  test('render card title', () => {
    //render(<App />);
    // fireEvent.scroll(screen.getAllByTestId('card-slider')[0], { target: { scrollLeft: 500} });
    // screen.debug();
    render(
      <CardSlider
        children={<div>hello</div>}
        myColor="red"
        icon={['left', 'right']}
        mobileStyle={true}
      />
    )
    screen.getByText(/Hello/i);
    screen.getByText(/left/i);
    screen.getByText(/right/i);

    //test for background color
    expect(screen.getByText(/left/i)).toHaveStyle('background-color: red');
    expect(screen.getByText(/right/i)).toHaveStyle('background-color: ');

    //test for color
    expect(screen.getByText(/left/i)).toHaveStyle('color: white');
    expect(screen.getByText(/right/i)).toHaveStyle('color: red');

    //test for mobile style
    expect(screen.getByText(/left/i)).toHaveClass('mobile');
    expect(screen.getByText(/right/i)).toHaveClass('mobile');

    //test for scroll
    fireEvent.scroll(screen.getByText('hello'), { target: { scrollLeft: 500 } });
    expect(screen.getByText(/left/i)).toHaveStyle('background-color: red');
    // expect(screen.getByText(/right/i)).toHaveStyle('background-color: ');

    
    screen.debug();
  });
});
 