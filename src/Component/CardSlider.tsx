import React,{useState,useRef} from 'react';
import "./cardslider.css";



interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  icon?: any[];
}


const CardSlider:React.FC<Props> = ({children, backgroundColor, icon}) => {
  let myRef = useRef<any>();
  const [changeLeftStyle, setChangeLeftStyle] = useState(true);
  const [changeRightStyle, setChangeRightStyle] = useState(false);

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
  }
  return (
    <div className="card-slider">
          <div 
          onClick={slideLeft}
          style={changeLeftStyle? {backgroundColor: backgroundColor, color: 'white'} : {}}
          className='angle angle_left'>
             {icon? icon[0] : '<'}
          </div>
          <div ref={myRef}
          onScroll={handleScroll}
           className='slider'>
            {children}
          </div>
          <div 
           onClick={slideRight}
          style={ changeRightStyle ? {backgroundColor: backgroundColor, color: 'white'} : {}}
          className=' angle angle_right'>
            {icon? icon[1] : '>'}
            </div>
    </div>
  );
}

export default CardSlider;