import { React, useState } from "react";
import "../styles/RollDice.css";
import Die from "./Die";
import NavBar from "./NavBar";

const RollDice = ({ sides }) => {
  const [dices, setDices] = useState({
    die1: ["one", false],
    die2: ["two", false],
    die3: ["three", false],
    die4: ["four", false],
    die5: ["six", false],
    rolling: false,
    showPlay: false,
  });

  const [jugadorActivo, setJugadorActivo] = useState({
    jugador1: true,
    jugador2: false
  });

  const cambiarDeJugador = () =>{
    jugadorActivo.jugador1? 
    (setJugadorActivo({
      jugador1:false,
      jugador2:true
    })):
    setJugadorActivo({
      jugador1:true,
      jugador2:false
    })
    setTiradas(3);
  }

  const [score, setScore] = useState({
    score: 0,
    totalScore: 0,
  });

  const [tiradas, setTiradas] = useState(3);

  const [turnos, setTurnos] = useState(10);

  const { die1, die2, die3, die4, die5, rolling } = dices;


  const finalizarJugada = () =>{
    const jugadaObtenida = definirJugada(mano);
    let puntosObtenidos = puntaje(definirJugada(mano));
    
    setScore((prevState) => ({
      ...prevState,
      score: puntosObtenidos,
      totalScore: prevState.totalScore + puntosObtenidos,
    }));
    jugadorActivo.jugador2?setTurnos(prevState => prevState-1):setTurnos(prevState => prevState);
    setDefaultDices();
    clearAllSaves();
    cambiarDeJugador();
  }


  const tiradasManager = () =>{
    tiradas>0 ? roll() : finalizarJugada()

  }

  const roll = () => {
    const newDie1 = die1[1]? die1 :[Object.keys(sides[Math.floor(Math.random() * sides.length)])[0], die1[1]];
    const newDie2 = die2[1]? die2 :[Object.keys(sides[Math.floor(Math.random() * sides.length)])[0], die2[1]];
    const newDie3 = die3[1]? die3 :[Object.keys(sides[Math.floor(Math.random() * sides.length)])[0], die3[1]];
    const newDie4 = die4[1]? die4 :[Object.keys(sides[Math.floor(Math.random() * sides.length)])[0], die4[1]];
    const newDie5 = die5[1]? die5 :[Object.keys(sides[Math.floor(Math.random() * sides.length)])[0], die5[1]];
    /*const score1 = Object.values(newDie1);
    const score2 = Object.values(newDie2);
    const score3 = Object.values(newDie3);
    const score4 = Object.values(newDie4);
    const score5 = Object.values(newDie5);*/
    setDices(() => ({
      die1: newDie1,
      die2: newDie2, 
      die3: newDie3, 
      die4: newDie4, 
      die5: newDie5, 
      rolling: true,
      showPlay: false,
    }));
    
    //const mano = ["one", "two", "three", "four", "five"];
    setTimeout(() => {
      setDices((prevState) => ({
        ...prevState,
        rolling: false,
        showPlay: true,
      }));
    }, 500);

    setTiradas((prevState) =>
      prevState  - 1
    );
  };

  const mano = [
    dices.die1[0],
    dices.die2[0],
    dices.die3[0],
    dices.die4[0],
    dices.die5[0],
  ];
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
    return (escalera1.every(dice => mano.includes(dice)) || escalera2.every(dice => mano.includes(dice)));
};

const definirJugada = (mano) => {
    return (esGenerala(mano)?"¡GENERALA!":
            esPoquer(mano)?"¡POKER!": 
            esFull(mano)?"¡FULL!":
            esEscalera(mano)?"¡STRAIGHT!":
            "¡Better luck next time!"
            );           
};

  const setDefaultDices = () =>{
      setDices({
      die1: ["one", false],
      die2: ["two", false],
      die3: ["three", false],
      die4: ["four", false],
      die5: ["six", false],
      rolling: false,
      showPlay: false,
  });
  }

  const resetGame = () => {
    setDefaultDices()
    setScore({
      score:0,
      totalScore:0,
    })
    clearAllSaves()
    setTurnos(10)
    setTiradas(3)
  };

  const puntaje = (jugada) => {
    switch (jugada) {
      case "¡GENERALA!":
        return 60;
      case "¡POKER!":
        return 40;
      case "¡FULL!":
        return 30;
      case "¡STRAIGHT!":
        return 20;
      default:
        return 0;
    }
  };

  const puntajeTotal = (jugada) =>{
    return puntaje(jugada) + score.totalScore;
  };
  const handleBtn = dices.rolling ? "rolling" : "";
  
  
  const save = (dado) => {
    dado[1]? dado[1]=false: dado[1]= true
  }
  const clearAllSaves = () => {
    setDices((prevState) => ({
      ...prevState,
      die1: [prevState.die1[0], false],
      die2: [prevState.die2[0], false],
      die3: [prevState.die3[0], false],
      die4: [prevState.die4[0], false],
      die5: [prevState.die5[0], false],
    }));
  }



  return (
    <div>
      <NavBar />
      <div className="col tiradas">
        <h3>Tiradas restantes: {tiradas}</h3>
        <h3>Turnos restantes:{turnos}</h3>
      </div>
      <div className="RollDice-container">
        <div className="row containerD">
          <div className="col-md">
            <Die face={String(die1[0])} rolling={rolling && !die1[1]} />
            <button className="lock-button" onClick={save.bind(this,die1)}>Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die2[0])} rolling={rolling && !die2[1]} />
            <button className="lock-button" onClick={save.bind(this,die2)}>Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die3[0])} rolling={rolling && !die3[1]} />
            <button className="lock-button" onClick={save.bind(this,die3)}>Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die4[0])} rolling={rolling && !die4[1]} />
            <button className="lock-button" onClick={save.bind(this,die4)}>Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die5[0])} rolling={rolling && !die5[1]} />
            <button className="lock-button" onClick={save.bind(this,die5)}>Save</button>
          </div>
          <div className="col-md">
            <button className="lock-button" onClick={clearAllSaves}>Clear Saves</button>
          </div>
        </div>
      </div>
      <div className="RollDice">
        <div className="row roll-end-btn">
        <div className="col-md text-center">
        <button className={handleBtn} disabled={rolling} onClick={tiradasManager}>
          {dices.rolling ? "Rolling..." : (tiradas>0?"Roll the dices!":"End turn")}
        </button>
        </div>
        <div className="col-md text-center">
        {tiradas >0? <button className={handleBtn} disabled={rolling} onClick={finalizarJugada}>
          {dices.rolling ? "Rolling..." : "End turn"}
        </button> : ""}
        </div>
        </div>
        <div className="Score">
          {dices.showPlay ? (
            <div className='container'>
            <h3 className='jugada'>{definirJugada(mano)}</h3>
        </div>
          ) : (
            ""
          )}
          <div className="score">
            <h4 className="Score">Score: {puntaje(definirJugada(mano))}</h4>
            <h4 className="TotalScore">Total Score: {puntajeTotal(definirJugada(mano))}</h4>
          </div>
        </div>
      </div>
      <div className="col">
        <button className="reset-game-btn" onClick={resetGame}>
          Restart game
        </button>
      </div>
    </div>
  );
};

RollDice.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
};
export default RollDice;
