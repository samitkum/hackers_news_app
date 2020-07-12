import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import githubLogo from "../../github.png";
import linkedinLogo from "../../linkedin.png";

import "./NavBar.scss";

const Navcustom = (props) => {
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: -10 }}
      transition={{ delay: 0.5 }}
    >
      <Navbar variant="dark" className="color-nav">
        <Link to={"/"}>
          <Navbar.Brand href="" className="headingPart">
            <span className="heading">H</span>acker
            <span className="heading">N</span>ews
          </Navbar.Brand>
        </Link>
        <div>
          <a
            href="https://github.com/samitkum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.img
              whileHover={{ scale: [1, 1.2, 1, 1.2, 1, 1.2] }}
              src={githubLogo}
              alt="fireSpot"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/amit-kumar-singh-468976145/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.img
              whileHover={{ scale: [1, 1.2, 1, 1.2, 1, 1.2] }}
              src={linkedinLogo}
              alt="fireSpdot"
            />
          </a>
        </div>
      </Navbar>
    </motion.div>
  );
};

export default Navcustom;
