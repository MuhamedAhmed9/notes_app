import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg w-100`}>
        <div className="container">
          <Link className={`nav-link`} to="/">
            Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {props.userData ? (
                <>
                  <li className="nav-item">
                    <span onClick={props.logout} className="nav-link">
                      Logout
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      Hello, {props.userData.first_name}
                    </span>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
