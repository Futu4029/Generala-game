import { React } from "react";
import { Link } from "react-router-dom";
import "../styles/Index.css";

const Index = () => {
  return (
    <div className="start-game">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Welcome to GENERALA</h2>
          </div>
          <div className="col-md-6 ">
            <Link to={`/tutorial`} style={{ textDecoration: "none" }}>
              <h1 className="htp">How to play?</h1>
            </Link>
          </div>
          <div className="col-lg-6">
            <Link to={`/game`} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">PRESS HERE TO START</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
