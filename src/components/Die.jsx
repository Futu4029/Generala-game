import { React,   } from 'react';
import "../styles/Die.css";

const Die = ({face, rolling}) => {


	// Using font awesome icon to show
	// the exactnumber of dots
	return (<i className={`Die fas fa-dice-${face}
			${rolling && 'Die-shaking'}`}/>
    );
};
  



  

export default Die;
