import React,{useState,useRef,useEffect} from 'react';
import "./cardslider.css";



interface Props {
  children: React.ReactNode;
  myColor?: string;
  icon?: any[];
  mobileStyle?: boolean;
}


const CardSlider:React.FC<Props> = ({children,myColor, icon, mobileStyle}) => {
  
  let myRef = useRef<any>();
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [changeLeftStyle, setChangeLeftStyle] = useState(true);
  const [changeRightStyle, setChangeRightStyle] = useState(false);


  useEffect(() => {
    if(icon?.length === 0){
      //eslint-disable-next-line
      throw ('icon is cannot be empty');
    }else if(icon && icon?.length !== 2){
      //eslint-disable-next-line
      throw ('icon must contain two elements');
    }else{
      return;
    }
  },[icon]);

  const slideLeft  =() => {
    myRef.current.scrollLeft -= 500;
    if(myRef.current.scrollLeft <= 500 ){
      setChangeLeftStyle(true)
      setChangeRightStyle(false)
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
    //console.log(changeLeftStyle)
  }

  
   


  return (
    <div className="card-slider">
      <div 
      onMouseEnter={() => setIsHoveringLeft(true)}
      onMouseLeave={() => setIsHoveringLeft(false)}
       onClick={slideLeft}
       style={{...style(myColor? myColor: ''),
       
       backgroundColor: changeLeftStyle && myColor? myColor: changeLeftStyle && !myColor ? '#02897A': myColor && isHoveringLeft ? myColor : '' , 


        color: changeLeftStyle || isHoveringLeft ? 'white':
        myColor
      }}

       className={`angle angle_left ${mobileStyle && 'mobile'} `}>

        {icon? icon[0] : '<'}
      </div>
     
      <div ref={myRef}
      onScroll={handleScroll}
        className='slider'>
        {children}
      </div>
      <div 
      onMouseEnter={() => setIsHoveringRight(true)}
      onMouseLeave={() => setIsHoveringRight(false)}

        onClick={slideRight}
      style={
        {...style(myColor? myColor: ''), 
        
        backgroundColor:changeRightStyle  && myColor? myColor: changeRightStyle && !myColor ? '#02897A': myColor && isHoveringRight ? myColor : '' , 
        
        color: changeRightStyle || isHoveringRight ? 'white': myColor}}

      className={`angle angle_right ${mobileStyle && 'mobile'}`}>
        {icon? icon[1] : '>'}
        </div>

    </div>
  );
}

 function style(color:string){
  const style = {
    color: color,
    border: `1px solid ${color}`,
    
  }
  return style;
 }




 
 


export default CardSlider;


//npm install --save-dev @iconify/react