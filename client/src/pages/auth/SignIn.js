import React, { useEffect, useState } from "react";
import { ButtonToolbar } from "reactstrap";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
// import toast from "react-hot-toast";
import {
  CustomButton,
  CustomButtonGroup,
} from "../../components/custom/CustomButton";
import CustomForm from "../../components/custom/CustomForm";
import CustomCard from "../../components/custom/CustomCard";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // toast.success("Form submitted");
  };

  const formFields = [
    {
      label: "Username",
      type: "text",
      id: "username",
      placeholder: "Enter username",
      value: formData.username,
      onChange: handleInputChange,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      placeholder: "*****",
      value: formData.password,
      onChange: handleInputChange,
    },
  ];

  const handleSocialLogin = (provider) => {
    // Implement social media login logic here
    // toast.success(`Logging in with ${provider}`);
  };
  useEffect(() => {

    fetch('localhost:8000',
      {
        method: 'POST', headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)

      }).then((result) => {
        console.log(result);
      }).catch((error) => { console.log(error); })
  }, [formData])

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
      <CustomCard header="Sign in" subtitle="Sign in to access your account">
        <CustomForm formFields={formFields} onSubmit={handleSubmit} />
        <Link to="/register">Don't have an account, click here</Link>
        <hr />
        <CustomButton
          type="filled"
          className="w-100 mb-3"
          color="#A78BFA"
          onClick={() => handleSocialLogin("Google")}
        >
          <FaGoogle /> Login with Google
        </CustomButton>
        <ButtonToolbar>
          <CustomButtonGroup className="w-100">
            <CustomButton
              type="filled"
              color="#A78BFA"
              className="flex-fill"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <FaFacebook />
            </CustomButton>
            <CustomButton
              type="filled"
              className="flex-fill"
              color="#A78BFA"
              onClick={() => handleSocialLogin("Twitter")}
            >
              <FaTwitter />
            </CustomButton>
          </CustomButtonGroup>
        </ButtonToolbar>
      </CustomCard>
    </div>
  );
}
