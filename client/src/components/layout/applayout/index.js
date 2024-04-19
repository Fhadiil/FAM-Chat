import React from "react";
import { Row, Col } from "reactstrap";
import Header from "../../view/Header";
import Footer from "../../view/Footer";

const AppLayout = ({ children }) => {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    // backgroundColor: "#f3f6f4",
  };

  const headerStyle = {
    flex: "0 0 auto", // Fixed header at the top
  };

  const mainStyle = {
    flex: "1", // Allow main content to grow and take remaining space
    padding: "20px", // Adjust the padding as needed
  };

  const footerStyle = {
    flex: "0 0 auto", // Fixed footer at the bottom
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/signIn", label: "Login" },
    { to: "/register", label: "SignUp" },
  ];

  const footerContent = <p>&copy; 2023 FAM DATA. All rights reserved.</p>;

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        <Header links={links} />
      </header>
      <main style={mainStyle}>
        <Row>
          {React.Children.map(children, (child, index) => (
            <Col key={index} xs="12" md="12">
              {child}
            </Col>
          ))}
        </Row>
      </main>
      <footer style={footerStyle}>
        <Footer content={footerContent} />
      </footer>
    </div>
  );
};

export default AppLayout;
