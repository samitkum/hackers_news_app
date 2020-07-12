import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import "./NavBar.scss";

const Navcustom = (props) => {
  return (
    <React.Fragment>
      <Navbar variant="dark" className="color-nav">
        <Link to={"/"}>
          <Navbar.Brand href="" className="headingPart">
            <span className="heading">H</span>acker
            <span className="heading">N</span>ews
          </Navbar.Brand>
        </Link>
      </Navbar>
    </React.Fragment>
  );
};

export default Navcustom;
