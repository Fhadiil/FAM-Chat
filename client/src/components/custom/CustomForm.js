import React from "react";
import { Form, Button } from "reactstrap";
import CustomInput from "./CustomInput";

const CustomForm = ({ formFields, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    {formFields.map((field, index) => (
      <CustomInput key={index} {...field} />
    ))}
    <div className="text-center">
      <Button type="submit" color="primary">
        Submit
      </Button>
    </div>
  </Form>
);
export default CustomForm;
