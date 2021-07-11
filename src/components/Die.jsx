import { React,   } from 'react';
import "../styles/Die.css";

const Die = ({face, rolling}) => {



	return (<i className={`Die fas fa-dice-${face}
			${rolling && 'Die-shaking'}`}/>
    );
};
  



  

export default Die;
