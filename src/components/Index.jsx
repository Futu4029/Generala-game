import { React } from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import Image from "../image/dice-cup.png";

const Index = () => {
  return (
    <div className="start-game">
      <div className="container text-center">

        <h1>GENERALA</h1>
        <div className="row">
          <div className="col">
            <img src={Image} alt="imagen dados rodando" className="center img-dados"></img>
          </div>
          <div className="col-md-12 ">
            <Link to={`/tutorial`} style={{ textDecoration: "none" }}>
              <h1 className="htp">¿Cómo jugar?</h1>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <Link to={`/unJugador`} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">UN JUGADOR</button>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <Link to={`/dosJugadores`} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">DOS JUGADORES</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
