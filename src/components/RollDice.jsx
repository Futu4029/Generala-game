import { React, useState } from "react";
import "../styles/RollDice.css";
import Die from "./Die";
import NavBar from "./NavBar";

const RollDice = ({ sides }) => {
  const [dices, setDices] = useState({
    die1: "one",
    die2: "one",
    die3: "one",
    die4: "one",
    die5: "one",
    rolling: false,
    showPlay: false,
  });

  const [score, setScore] = useState({
    score: 0,
    totalScore: 0,
    jugada: "",
  });

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

  const { die1, die2, die3, die4, die5, rolling } = dices;

  const roll = () => {
    const newDie1 = sides[Math.floor(Math.random() * sides.length)];
    const newDie2 = sides[Math.floor(Math.random() * sides.length)];
    const newDie3 = sides[Math.floor(Math.random() * sides.length)];
    const newDie4 = sides[Math.floor(Math.random() * sides.length)];
    const newDie5 = sides[Math.floor(Math.random() * sides.length)];
    /*const score1 = Object.values(newDie1);
    const score2 = Object.values(newDie2);
    const score3 = Object.values(newDie3);
    const score4 = Object.values(newDie4);
    const score5 = Object.values(newDie5);*/

    setDices((prevState) => ({
      ...prevState,
      die1: Object.keys(newDie1),
      die2: Object.keys(newDie2),
      die3: Object.keys(newDie3),
      die4: Object.keys(newDie4),
      die5: Object.keys(newDie5),
      rolling: true,
      showPlay: false,
    }));

    //const mano = ["one", "two", "three", "four", "five"];
    const mano = [
      dices.die1[0],
      dices.die2[0],
      dices.die3[0],
      dices.die4[0],
      dices.die5[0],
    ];

    let jugadaObtenida = definirJugada(mano)
    let puntosObtenidos = puntaje(jugadaObtenida)

    setScore((prevState) => ({
      ...prevState,
      score: puntosObtenidos,
      totalScore: prevState.totalScore + puntosObtenidos,
      jugada: jugadaObtenida
    }));

    setTimeout(() => {
      setDices((prevState) => ({
        ...prevState,
        rolling: false,
        showPlay: true,
      }));
    }, 500);
  };

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

  const resetGame = () => {
    setDices({
      die1: "one",
      die2: "one",
      die3: "one",
      die4: "one",
      die5: "one",
      rolling: false,
      score: 0,
      totalScore: 0,
    });
  };

  const handleBtn = dices.rolling ? "rolling" : "";

  return (
    <div>
      <NavBar />
      <div className="RollDice-container">
        <div className="row containerD">
          <div className="col-md">
            <Die face={String(die1)} rolling={rolling} />
            <button className="lock-button">Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die2)} rolling={rolling} />
            <button className="lock-button">Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die3)} rolling={rolling} />
            <button className="lock-button">Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die4)} rolling={rolling} />
            <button className="lock-button">Save</button>
          </div>
          <div className="col-md">
            <Die face={String(die5)} rolling={rolling} />
            <button className="lock-button">Save</button>
          </div>
        </div>
      </div>
      <div className="RollDice">
        <button className={handleBtn} disabled={rolling} onClick={roll}>
          {dices.rolling ? "Rolling..." : "¡Roll the dices!"}
        </button>
        <div className="Score">
          {dices.showPlay ? (
            <div className='container'>
            <h3 className='jugada'>{score.jugada}</h3>
        </div>
          ) : (
            ""
          )}
          <div className="score">
            <h4 className="Score">Score: {score.score}</h4>
            <h4 className="TotalScore">Total Score: {score.totalScore}</h4>
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
