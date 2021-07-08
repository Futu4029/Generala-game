import { React   } from 'react';

const Jugadas = ({mano}) => {
   
    const esGenerala = (mano) =>{
        let primerDado = mano[0];
        return (mano.filter(dado => dado === primerDado).length === 5);
    }

    const esPoquer = (mano) =>{
        let primerDado = mano[0];
        let segundoDado = mano[1];
        return (mano.filter(dado => dado === primerDado).length === 4 || 
                mano.filter(dado => dado === segundoDado).length === 4);
    }

    const esFull = (mano) =>{
        return (esTrio(mano) && esDoble(mano));
    }

    const esTrio = (mano) =>{
        let primerDado = mano[0];
        let segundoDado = mano[1];
        let tercerDado = mano[2];
        return (mano.filter(dado => dado === primerDado).length === 3 || 
                mano.filter(dado => dado === segundoDado).length === 3 ||
                mano.filter(dado => dado === tercerDado).length === 3);
    }
    const esDoble = (mano) =>{
        let primerDado = mano[0];
        let segundoDado = mano[1];
        let tercerDado = mano[2];
        let cuartoDado = mano[3];
        return (mano.filter(dado => dado === primerDado).length === 2 || 
                mano.filter(dado => dado === segundoDado).length === 2 ||
                mano.filter(dado => dado === tercerDado).length === 2 ||
                mano.filter(dado => dado === cuartoDado).length === 2);
    }

    const esEscalera = (mano) =>{
        let escalera1 = ["one","two","three","four","five"];
        let escalera2 = ["two","three","four","five","six"];
        console.log(mano);
        return (escalera1.every(dice => mano.includes(dice)) || escalera2.every(dice => mano.includes(dice)));
    };

    const definirJugada = (mano) => {
        return (esGenerala(mano)?"Es generala":
                esPoquer(mano)?"Es poquer": 
                esFull(mano)?"Es full":
                esEscalera(mano)?"Es escalera":
                "¡Mejor suerte la proxima!")
                
    };
    return(
        <div className='container'>
            <p className='jugada'>{definirJugada(mano)}</p>
        </div>
        
    )
};

export default Jugadas;