import { React, useEffect, useState } from "react";
import "../styles/RollDice.css";
import Die from "./Die";
import Jugadas from "./Jugadas";

const RollDice = ({ sides }) => {
  const [dices, setDices] = useState({
    die1: "one",
    die2: "one",
    die3: "one",
    die4: "one",
    die5: "one",
    rolling: false,
    score: 0,
    totalScore: 0,
  });

  const { die1, die2, die3, die4, die5, rolling, score, totalScore } = dices;

  const roll = () => {
    const newDie1 = sides[Math.floor(Math.random() * sides.length)];
    const newDie2 = sides[Math.floor(Math.random() * sides.length)];
    const newDie3 = sides[Math.floor(Math.random() * sides.length)];
    const newDie4 = sides[Math.floor(Math.random() * sides.length)];
    const newDie5 = sides[Math.floor(Math.random() * sides.length)];
    const score1 = Object.values(newDie1);
    const score2 = Object.values(newDie2);
    const score3 = Object.values(newDie3);
    const score4 = Object.values(newDie4);
    const score5 = Object.values(newDie5);
    
    setDices(
      // Changing state upon click
      (prevState) => ({ ...prevState,
      die1: Object.keys(newDie1),
      die2: Object.keys(newDie2),
      die3: Object.keys(newDie3),
      die4: Object.keys(newDie4),
      die5: Object.keys(newDie5),
      rolling: true,
      score: score1[0] + score2[0] + score3[0] + score4[0] + score5[0],
      totalScore: score1[0] + score2[0] + score3[0] + score4[0] + score5[0] + totalScore,
    }));

    setTimeout(() => {
    
      setDices((prevState) => ({ ...prevState, rolling: false}))
    }, 500);

    console.log(mano)
  };
  const mano = [dices.die1[0],dices.die2[0],dices.die3[0],dices.die4[0],dices.die5[0]]
  const handleBtn = setDices.rolling ? "RollDice-rolling" : "";
  
  return (
    <div className="RollDice">
      <div className="RollDice-container">
        <Die face={String(die1)} rolling={rolling} />
        <Die face={String(die2)} rolling={rolling} />
        <Die face={String(die3)} rolling={rolling} />
        <Die face={String(die4)} rolling={rolling} />
        <Die face={String(die5)} rolling={rolling} />
      </div>
      <button className={handleBtn} disabled={rolling} onClick={roll}>
        {dices.rolling ? "Tirando..." : "¡Tira los dados!"}
      </button>
      <h2 className='Score'>Score: {score}</h2>
      <Jugadas mano = {mano}></Jugadas>
      <h2 className='TotalScore'>Total Score: {totalScore}</h2>
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
