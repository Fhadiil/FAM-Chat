import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const CustomButton = ({ type, color, ...props }) => {
  let buttonStyle = "filled";

  if (type === "outline") {
    buttonStyle = "outline";
  } else if (type === "submit") {
    buttonStyle = "submit";
  }

  return (
    <Button
      {...props}
      className={`${buttonStyle} ${color}`}
      style={{ backgroundColor: color, width: "100%" }}
    />
  );
};

const CustomButtonGroup = ({ children, color, ...props }) => {
  return (
    <ButtonGroup
      style={{ backgroundColor: color, width: "100%", marginTop: "15px" }}
      {...props}
      className="custom-button-group"
    >
      {children}
    </ButtonGroup>
  );
};

export { CustomButton, CustomButtonGroup };
