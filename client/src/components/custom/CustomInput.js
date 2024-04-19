import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

const CustomInput = ({ label, type, placeholder, id, value, onChange }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </FormGroup>
);

export default CustomInput;
