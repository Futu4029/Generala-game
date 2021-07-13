import { React } from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";
import Image from "../image/dice-cup.png";

const Index = () => {
  return (
    <div className="start-game">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-sm-6 title">
            <h1>GENERALA</h1>
          </div>
          <div className="row text-center">
            <div className="col-md-12 img-index">
              <img src={Image} alt="imagen dados rodando" className="center img-dados"></img>
            </div>
            <div className="col-md-6">
              <Link to={`/unJugador`} style={{ textDecoration: "none" }}>
                <button className="btn btn-light player-button">UN JUGADOR</button>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to={`/dosJugadores`} style={{ textDecoration: "none" }}>
                <button className="btn btn-light player-button">DOS JUGADORES</button>
              </Link>
            </div>
            <div className="col-md-12">
              <Link to={`/tutorial`} style={{ textDecoration: "none" }}>
                <button className="btn btn-info">¿CÓMO JUGAR?</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
