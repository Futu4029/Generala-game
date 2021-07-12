import { React } from 'react';
import Image from "../image/generala.png";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={`/game`} style={{ textDecoration: "none", color: "white" }}>
            <img src={Image} alt="imagenCubil" width="50" height="30" className="d-inline-block align-text-top"></img>
            <strong>GENERALA</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item nav-link">
                <Link to={`/index`} style={{ textDecoration: "none", color: "whitesmoke" }}>Home</Link>
              </li>
              <li className="nav-item nav-link">
                <Link to={`/tutorial`} style={{ textDecoration: "none", color: "whitesmoke" }}>How to play</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;