import React from 'react';
import { Icon } from '@iconify/react';
import CardSlider from './Component/CardSlider';
import './App.css';


const  App = () => {
  const cards = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div style={style}>
     <CardSlider
        myColor=''
        mobileStyle = {false}
        icon = {[
          <Icon 
        icon={'fa-angle-left'} />,
          <Icon 
        icon={'fa-angle-right'} />
        ]}
        >
          
      {cards.map((index) => 
        <div 
        data-testid='card-slider'
        key = {index} className='card-inner'>
        <div className='card-top'>
          <img  
          loading='lazy' width = "320px" 
          height = '180px' alt = "title"  
          src = "https://www.pixelstalk.net/wp-content/uploads/2016/08/Random-Nature-Wallpaper.jpg"
          onError = {(e:any) => {e.target.src = 'https://via.placeholder.com/320x180?text=No+Image+Found'}}
          />  
        </div>
        <div className='card-bottom'>
          <div className='card-info'>
            <p className='title'>This is the title</p>
            <p className='date' >Here is the details</p>
          </div>
        </div>
      </div>
      )}
      </CardSlider>
    </div>
  );
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}
export default App;
