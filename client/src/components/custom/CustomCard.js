import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
} from "reactstrap";

const CustomCard = ({
  bodyColor,
  header,
  subtitle,
  text,
  links,
  buttons,
  children,
  headerStyle,
  linkStyle,
  buttonStyle,
}) => {
  const cardStyle = {
    backgroundColor: bodyColor || "#ffffff",
    marginBottom: "20px",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
  };

  return (
    <Card style={cardStyle}>
      {header && (
        <CardBody style={headerStyle}>
          <CardTitle tag="h5">{header}</CardTitle>
          {subtitle && (
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {subtitle}
            </CardSubtitle>
          )}
        </CardBody>
      )}
      <CardBody>
        {text && <CardText>{text}</CardText>}
        {links && (
          <div>
            {links.map((link, index) => (
              <CardLink key={index} href={link.href} style={linkStyle}>
                {link.text}
              </CardLink>
            ))}
          </div>
        )}
        {buttons && (
          <div>
            {buttons.map((button, index) => (
              <Button
                key={index}
                color={button.color}
                onClick={button.onClick}
                style={buttonStyle}
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
        {children}
      </CardBody>
    </Card>
  );
};

export default CustomCard;
