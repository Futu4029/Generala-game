import { React, useState } from "react";
import "../styles/RollDice.css";
import Die from "./Die";
import NavBar from "./NavBar";

const DosJugadores = ({ sides }) => {
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


  const [score, setScore] = useState({
    scoreJugador1: 0,
    totalScoreJugador1: 0,
    scoreJugador2: 0,
    totalScoreJugador2: 0,
  });

  const [manos, setManos] = useState({
    manoKeys: [
      dices.die1[0],
      dices.die2[0],
      dices.die3[0],
      dices.die4[0],
      dices.die5[0],
    ],
    manoValues: []
  });

  const [tiradas, setTiradas] = useState(3);

  const [turnos, setTurnos] = useState(10);

  const { die1, die2, die3, die4, die5, rolling } = dices;

  const setPuntajeJugador1 = (puntos) => {
    setScore((prevState) => ({
      ...prevState,
      scoreJugador1: puntos,
      totalScoreJugador1: prevState.totalScoreJugador1 + puntos,
    }));
  }
  const setPuntajeJugador2 = (puntos) => {
    setScore((prevState) => ({
      ...prevState,
      scoreJugador2: puntos,
      totalScoreJugador2: prevState.totalScoreJugador2 + puntos,
    }));
  }

  const cambiarDeJugador = () => {
    jugadorActivo.jugador1 ?
      (setJugadorActivo({
        jugador1: false,
        jugador2: true
      })) :
      setJugadorActivo({
        jugador1: true,
        jugador2: false
      })
    setTiradas(3);
  }

  const definirPuntaje = (puntos) => {
    jugadorActivo.jugador1 ?
      setPuntajeJugador1(puntos) :
      setPuntajeJugador2(puntos)
  }

  const siguienteTurno = () => {
    jugadorActivo.jugador2 ? setTurnos(prevState => prevState - 1) : setTurnos(prevState => prevState);
  }

  const definirGanador = () => {
    return score.totalScoreJugador1 > score.totalScoreJugador2 ?
      "¡GANA EL JUGADOR 1!" :
      score.totalScoreJugador1 === score.totalScoreJugador2 ?
        "¡ES UN EMPATE!" :
        "¡GANA EL JUGADOR 2!";
  }

  const cleanScore = () => {
    setScore((prevState) => ({
      ...prevState,
      scoreJugador1: 0,
      scoreJugador2: 0,
    }))
  }
  const cleanTotalScore = () => {
    setScore((prevState) => ({
      ...prevState,
      totalScoreJugador1: 0,
      totalScoreJugador2: 0,
    }))
  }
  const finalizarJugada = () => {
    let jugadaObtenida = definirJugada(mano);
    let puntosObtenidos = puntaje(jugadaObtenida);

    definirPuntaje(puntosObtenidos)
    setDefaultDices();
    siguienteTurno();
    setManos((prevState) => ({
      ...prevState,
      manoKeys: [die1, die2, die3, die4, die5],
    }))
    clearAllSaves();
    cambiarDeJugador();
  }

  const tiradasManager = () => {
    tiradas > 0 ? roll() : finalizarJugada()
  }

  const roll = () => {
    cleanScore();
    // Le pregunto por el elemento [1] que es el estado del dado, si es true seteo el mismo, si es false re-rolleo
    const newDie1 = sides[Math.floor(Math.random() * sides.length)];
    const newDie2 = sides[Math.floor(Math.random() * sides.length)];
    const newDie3 = sides[Math.floor(Math.random() * sides.length)];
    const newDie4 = sides[Math.floor(Math.random() * sides.length)];
    const newDie5 = sides[Math.floor(Math.random() * sides.length)];
    let dieValue1 = die1[1] ? manos.manoValues[0] : Object.values(newDie1)[0];
    let dieValue2 = die2[1] ? manos.manoValues[1] : Object.values(newDie2)[0];
    let dieValue3 = die3[1] ? manos.manoValues[2] : Object.values(newDie3)[0];
    let dieValue4 = die4[1] ? manos.manoValues[3] : Object.values(newDie4)[0];
    let dieValue5 = die5[1] ? manos.manoValues[4] : Object.values(newDie5)[0];
    let dieKey1 = die1[1] ? die1[0] : Object.keys(newDie1)[0];
    let dieKey2 = die2[1] ? die2[0] : Object.keys(newDie2)[0];
    let dieKey3 = die3[1] ? die3[0] : Object.keys(newDie3)[0];
    let dieKey4 = die4[1] ? die4[0] : Object.keys(newDie4)[0];
    let dieKey5 = die5[1] ? die5[0] : Object.keys(newDie5)[0];

    setDices(() => ({
      die1: [dieKey1, die1[1]],
      die2: [dieKey2, die2[1]],
      die3: [dieKey3, die3[1]],
      die4: [dieKey4, die4[1]],
      die5: [dieKey5, die5[1]],
      rolling: true,
      showPlay: false,
    }));
    setManos((prevState) => ({
      ...prevState,
      manoKeys: [dieKey1, dieKey2, dieKey3, dieKey4, dieKey5],
      manoValues: [dieValue1, dieValue2, dieValue3, dieValue4, dieValue5]
    }))

    setTimeout(() => {
      setDices((prevState) => ({
        ...prevState,
        rolling: false,
        showPlay: true,
      }));
    }, 500);

    setTiradas((prevState) =>
      prevState - 1
    );
  };
  //const mano = ["one", "two", "three", "four", "five"];
  const mano = manos.manoKeys;

  const esGenerala = (mano) => {
    let primerDado = mano[0];
    return (mano.filter(dado => dado === primerDado).length === 5);
  }

  const esPoquer = (mano) => {
    let primerDado = mano[0];
    let segundoDado = mano[1];
    return (mano.filter(dado => dado === primerDado).length === 4 ||
      mano.filter(dado => dado === segundoDado).length === 4);
  }

  const esFull = (mano) => {
    return (esTrio(mano) && esDoble(mano));
  }

  const esTrio = (mano) => {
    let primerDado = mano[0];
    let segundoDado = mano[1];
    let tercerDado = mano[2];
    return (mano.filter(dado => dado === primerDado).length === 3 ||
      mano.filter(dado => dado === segundoDado).length === 3 ||
      mano.filter(dado => dado === tercerDado).length === 3);
  }
  const esDoble = (mano) => {
    let primerDado = mano[0];
    let segundoDado = mano[1];
    let tercerDado = mano[2];
    let cuartoDado = mano[3];
    return (mano.filter(dado => dado === primerDado).length === 2 ||
      mano.filter(dado => dado === segundoDado).length === 2 ||
      mano.filter(dado => dado === tercerDado).length === 2 ||
      mano.filter(dado => dado === cuartoDado).length === 2);
  }

  const resolverDoble = (mano) => {
    mano.sort((a, b) => b - a);// para sacar el más alto de la lista
    let primerDado = mano[0];
    let segundoDado = mano[1];
    let tercerDado = mano[2];
    let cuartoDado = mano[3];
    let solucion =
      mano.filter(dado => dado === primerDado).length === 2 ? primerDado * 2 :
        mano.filter(dado => dado === segundoDado).length === 2 ? segundoDado * 2 :
          mano.filter(dado => dado === tercerDado).length === 2 ? tercerDado * 2 :
            cuartoDado * 2;
    return solucion;
  }

  const resolverTrio = (mano) => {
    let primerDado = mano[0];
    let segundoDado = mano[1];
    let tercerDado = mano[2];
    let solucion =
      mano.filter(dado => dado === primerDado).length === 3 ? primerDado * 3 :
        mano.filter(dado => dado === segundoDado).length === 3 ? segundoDado * 3 :
          tercerDado * 3
    return solucion;
  }

  const esEscalera = (mano) => {
    let escalera1 = ["one", "two", "three", "four", "five"];
    let escalera2 = ["two", "three", "four", "five", "six"];
    return (escalera1.every(dice => mano.includes(dice)) ||
      escalera2.every(dice => mano.includes(dice)));
  };

  const definirJugada = (mano) => {
    return (esGenerala(mano) ? "¡GENERALA!" :
      esPoquer(mano) ? "¡POKER!" :
        esFull(mano) ? "¡FULL!" :
          esEscalera(mano) ? "¡ESCALERA!" :
            esTrio(mano) ? "¡SACASTE TRIO!" :
              esDoble(mano) ? "¡SACASTE DOBLE!" :
                "¡Tendrás más suerte en la proxima tirada!"
    )
  };

  const puntaje = (jugada) => {
    switch (jugada) {
      case "¡GENERALA!":
        return 60;
      case "¡POKER!":
        return 40;
      case "¡FULL!":
        return 30;
      case "¡ESCALERA!":
        return 20;
      case "¡SACASTE TRIO!":
        return resolverTrio(manos.manoValues);
      case "¡SACASTE DOBLE!":
        return resolverDoble(manos.manoValues);
      default:
        return 0;
    }
  };

  const setDefaultDices = () => {
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
    setDefaultDices();
    cleanScore();
    cleanTotalScore();
    clearAllSaves();
    setTurnos(10);
    setTiradas(3);
  };

  const handleBtn = dices.rolling ? "rolling" : "";

  const save = (dado) => {
    (dado === die1) ?
      setDices((prevState) => ({
        ...prevState,
        die1: [dado[0], dado[1] ? false : true]
      })) :
      (dado === die2) ?
        setDices((prevState) => ({
          ...prevState,
          die2: [dado[0], dado[1] ? false : true]
        })) :
        (dado === die3) ?
          setDices((prevState) => ({
            ...prevState,
            die3: [dado[0], dado[1] ? false : true]
          })) :
          (dado === die4) ?
            setDices((prevState) => ({
              ...prevState,
              die4: [dado[0], dado[1] ? false : true]
            })) :
            setDices((prevState) => ({
              ...prevState,
              die5: [dado[0], dado[1] ? false : true]
            }));
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
    <div className="roll-page">
      <NavBar />
      <div className="col tiradas">
        <div className="row cabecera">
          <div className="col-md-6">
            <h3>Turnos restantes:{turnos}</h3>
          </div>
          <div className="col-md-6">
            <h3>Tiradas restantes: {tiradas}</h3>
          </div>
          <div className="col-md-12">
            <h3>Juega: {jugadorActivo.jugador1 ? "Jugador 1" : "Jugador 2"}</h3>
          </div>
        </div>
      </div>
      <div className="RollDice-container">
        <div className="row containerD">
          <div className="col-md">
            <Die face={String(die1[0])} rolling={rolling && !die1[1]} />
            <div className="col-sm">
              <button className="btn btn-warning" disabled={tiradas === 3} onClick={save.bind(this, die1)}>{die1[1] ? "Devolver" : "Guardar"}</button>
            </div>
          </div>
          <div className="col-md">
            <Die face={String(die2[0])} rolling={rolling && !die2[1]} />
            <div className="col-sm">
              <button className="btn btn-warning" disabled={tiradas === 3} onClick={save.bind(this, die2)}>{die2[1] ? "Devolver" : "Guardar"}</button>
            </div>
          </div>
          <div className="col-md">
            <Die face={String(die3[0])} rolling={rolling && !die3[1]} />
            <div className="col-sm">
              <button className="btn btn-warning" disabled={tiradas === 3} onClick={save.bind(this, die3)}>{die3[1] ? "Devolver" : "Guardar"}</button>
            </div>
          </div>
          <div className="col-md">
            <Die face={String(die4[0])} rolling={rolling && !die4[1]} />
            <div className="col-sm">
              <button className="btn btn-warning" disabled={tiradas === 3} onClick={save.bind(this, die4)}>{die4[1] ? "Devolver" : "Guardar"}</button>
            </div>
          </div>
          <div className="col-md">
            <Die face={String(die5[0])} rolling={rolling && !die5[1]} />
            <div className="col-sm">
              <button className="btn btn-warning" disabled={tiradas === 3} onClick={save.bind(this, die5)}>{die5[1] ? "Devolver" : "Guardar"}</button>
            </div>
          </div>
        </div>

      </div>
      <div className="col-md clear-button">
        <button className="btn btn-success" onClick={clearAllSaves}>Devolver todos</button>
      </div>
      <div className="col-md jugada-display">
        {turnos === 0 ? <div className='container'>
          <h3 className='jugada'>{definirGanador()}</h3>
        </div> : dices.showPlay ? (<div className='container'>
          <h3 className='jugada'>{definirJugada(mano)}</h3>
        </div>) : (<h3>¡Tira los dados!</h3>)
        }
      </div>
      <div className="RollDice">
        <div className="row roll-end-btn">
          {turnos > 0 ? <div className="col-md text-center">
            <button className={handleBtn} disabled={rolling} onClick={tiradasManager}>
              {dices.rolling ? "Tirando..." : (tiradas > 0 ? "¡Tirar dados!" : "Terminar turno")}
            </button>
          </div> : ""}
          {turnos > 0 ? <div className="col-md text-center">
            {tiradas > 0 ? <button className={handleBtn} disabled={rolling} onClick={finalizarJugada}>
              {dices.rolling ? "Tirando..." : "Terminar turno"}
            </button> : ""}
          </div> : ""}
        </div>
        <div className="Score">
          <div className="container">
            <div className="row">
              <div className="col-6 score-jugador1">
                <h4>Jugador 1</h4>
                <h4 className="Score">Puntaje: {score.scoreJugador1}</h4>
                <h4 className="TotalScore">Puntaje total: {score.totalScoreJugador1}</h4>
              </div>
              <div className="col-6 score-jugador2">
                <h4>Jugador 2</h4>
                <h4>Puntaje: {score.scoreJugador2}</h4>
                <h4>Puntaje total: {score.totalScoreJugador2}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <p>¿Quieres comenzar de nuevo?</p>
        <div className="col-md ">
          <button className="btn btn-danger btn-sm" onClick={resetGame}>
            Click aquí
          </button>
        </div>
      </div>
    </div>
  );
};

DosJugadores.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
};
export default DosJugadores;
