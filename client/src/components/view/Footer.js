import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = ({ content }) => {
  const footerStyle = {
    // backgroundColor: "#A78BFA",
    backgroundColor: "#052659",
  };

  return (
    <footer style={footerStyle} className="text-white">
      <Container>
        <Row>
          <Col>{content}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
