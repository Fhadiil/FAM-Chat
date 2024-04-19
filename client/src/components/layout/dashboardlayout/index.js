import React from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../view/Header";
import Footer from "../../view/Footer";
import Sidebar from "../../view/Sidebar";

const DashboardLayout = ({ children }) => {
  const layoutStyle = {
    // backgroundColor: "#f3f6f4",
    minHeight: "100vh",
    paddingTop: "0",
    paddingBottom: "0",
  };

  const links = [{ to: "/", label: "Home" }];

  const footerContent = <p>&copy; 2023 GEMS. All rights reserved.</p>;
  return (
    <Container fluid style={layoutStyle}>
      <Row>
        <Header links={links} />
      </Row>
      <Row>
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col sm={9}>
          <main>{children}</main>
        </Col>
      </Row>
      <Row>
        <Footer content={footerContent} />
      </Row>
    </Container>
  );
};

export default DashboardLayout;
