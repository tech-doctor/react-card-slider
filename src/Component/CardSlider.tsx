import React,{useState,useRef,useEffect} from 'react';
import "./cardslider.css";




interface Props {
  children: React.ReactNode;
  styleColor?: string;
  icon?: any[];
  mobileStyle?: boolean;
}

const CardSlider:React.FC<Props> = ({children, styleColor, icon, mobileStyle}) => {
  
  let myRef = useRef<any>();
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [changeLeftStyle, setChangeLeftStyle] = useState(true);
  const [changeRightStyle, setChangeRightStyle] = useState(false);

  useEffect(() => {
    if(icon?.length === 0){
      //eslint-disable-next-line
      throw ('icon is cannot be empty');
    }else if(icon && icon?.length < 2){
      //eslint-disable-next-line
      throw ('icon cannot be less than 2');
    } else if(icon && icon?.length > 2){
      //eslint-disable-next-line
      throw ('icon cannot be more than 2');
    }
    else{
      return;
    }
  },[icon]);


  useEffect(() => {
    if(isColor(styleColor) !== true){
      throw (`${styleColor} is not a valid color`); 
    }
  },[styleColor]);




  const slideLeft  = () => {
    myRef.current.scrollLeft -= 500;
    if(myRef.current.scrollLeft <= 500 ){
      setChangeLeftStyle(true)
      setChangeRightStyle(false)
      console.log('inside');
    }
  }
  
  const slideRight =() => {
    myRef.current.scrollLeft += 500; 
    if(myRef.current.scrollLeft >= myRef.current.scrollWidth - myRef.current.clientWidth){
      setChangeLeftStyle(false)
      setChangeRightStyle(true) 
    }else{
      setChangeLeftStyle(false);
    }
  }

  const handleScroll = () => {
    if(myRef.current.scrollLeft >= myRef.current.scrollWidth - myRef.current.clientWidth){
      setChangeRightStyle(true)
      setChangeLeftStyle(false)
    }else if(myRef.current.scrollLeft <= 500){
      setChangeLeftStyle(true)
      setChangeRightStyle(false)
    }else{
      setChangeLeftStyle(false)
      setChangeRightStyle(false)
    }
  }


  
  
  return (
    <div className="card-slider">
      <button 
      onMouseEnter={() => setIsHoveringLeft(true)}
      onMouseLeave={() => setIsHoveringLeft(false)}
       onClick={slideLeft}
       style={{...style(styleColor && isColor(styleColor)? styleColor: ''),

       backgroundColor: changeLeftStyle && styleColor && isColor(styleColor)?styleColor: !changeLeftStyle && !isHoveringLeft ? '' : !changeLeftStyle && isHoveringLeft && styleColor && isColor(styleColor) ? styleColor: '#02897A' ,

       color: changeLeftStyle || isHoveringLeft ? 'white': !changeLeftStyle && !isHoveringLeft && styleColor && isColor(styleColor)? styleColor : '#02897A' 
      }}

      className={`angle angle_left ${mobileStyle && 'mobile'} `}>
        {icon? icon[0] : '<'}
      </button>

      <div 
        ref={myRef}
        onScroll={handleScroll}
        className='slider'
        data-testid = 'sliderElement'
      >
        {children}
      </div>

      <button 
      onMouseEnter={() => setIsHoveringRight(true)}
      onMouseLeave={() => setIsHoveringRight(false)}

      onClick={slideRight}
      style={
        {...style(styleColor && isColor(styleColor)? styleColor: ''), 

        backgroundColor: changeRightStyle && styleColor && isColor(styleColor)?styleColor: !changeRightStyle && !isHoveringRight ? '' : !changeRightStyle && isHoveringRight && styleColor && isColor(styleColor) ? styleColor: '#02897A',

        color: changeRightStyle || isHoveringRight ? 'white': !changeRightStyle && !isHoveringRight && styleColor && isColor(styleColor)? styleColor : '#02897A' 
      }}

        className={`angle angle_right ${mobileStyle && 'mobile'}`}>
        {icon? icon[1] : '>'}
        </button>
    </div>
  );
}

function isColor(strColor:any):boolean{
  const  defaultStyle = new Option().style;
  defaultStyle.color  = strColor?strColor: '';
  if(defaultStyle.color.length !== 0)
  return true
  else{
    return false;
  }
}

 function style(color:any):object{
  const style = {
    color: color,
    border: `1px solid ${color}`,
  }
  return style;
 }

export default CardSlider;
