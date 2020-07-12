import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="Footer text-center mt-3 mb-3">
      <Container>
        <Row>
          <Col style={{ display: "inline" }}>
            <span style={{ color: "whitesmoke" }}>Created By </span>
            <a
              href="https://github.com/samitkum"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amit
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
