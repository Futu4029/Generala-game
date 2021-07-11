import { React } from "react";
import NavBar from "./NavBar";
import '../styles/Tutorial.css';

const Tutorial = () => {
  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Instrucciones</h2>
        <ol>
          <li className="titulo">
            <h3>Reglas</h3>
            <p><br></br>
              ¿Estas planeando unos días de descanso y diversión? <br></br><br></br>
              En esta
              publicación te enseñamos cómo jugar a la generala, un tradicional
              juego con dados. Los requisitos es contar con al menos dos
              jugadores, cinco dados, un anotador y un lápiz. <br></br><br></br>El objetivo del
              juego es que cada jugador sume la mayor cantidad de puntos
              posibles en su turno. <br></br><br></br>Se jugarán 11 rondas dónde se podrán sumar
              puntos, aunque cabe la posibilidad de conseguir cero puntos. En
              cada turno el jugador tiene la oportunidad de lanzar hasta tres
              veces los dados, en el primer lanzamiento se tiran todos los
              dados. De acuerdo al resultado obtenido se puede volver a lanzar
              de uno a cinco dados, los dados que no se lanzan quedan en la
              mesa. <br></br><br></br>También es posible que después del primer lanzamiento se
              acepte como resultado final y se de por concluido el turno.
              Después del segundo lanzamiento se puede finalizar el turno y
              sumar los puntos o recurrir a un tercer lanzamiento dejando más
              dados en la mesa. Una vez alcanzado los tres lanzamientos el
              jugador deberá sumar los puntos y la partida continuará al
              siguiente jugador. Los puntos obtenidos se deberán sumar en alguna
              de las 11 combinaciones posibles.
            </p>
          </li>
          <li>
            <h3>Tipos de jugadas</h3>
            <p><br></br>
              <strong>Escalera:</strong> se consigue si los dados forman
              1-2-3-4-5 o 2-3-4-5-6, aunque a veces se acepta 3-4-5-6-1. El
              jugador suma 20 puntos a la combinación escalera.<br></br>
              <strong>Full:</strong> tres dados de un mismo valor y dos de un
              mismo valor, por ejemplo 4-4-4-6-6. El jugador suma 30 puntos a la
              combinación full.<br></br>
              <strong>Poker:</strong> cuatro dados iguales y uno distinto, por
              ejemplo 2-2-2-2-5. El jugador suma 40 puntos a la combinación
              poker.<br></br>
              <strong>Generala:</strong> los cinco dados del mismo valor, por
              ejemplo 3-3-3-3-3. El jugador suma 60 puntos a la combinación
              generala.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
export default Tutorial;
