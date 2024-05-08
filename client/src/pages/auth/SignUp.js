import React, { useState } from "react";
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

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // -------   REGISTER USER    -----------

  const registerUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log(data);
        // eslint-disable-next-line no-lone-blocks
        {
          data.loggedIn && navigate(`${data.route}`);
          // &&toast.success("Form submitted");
        }
      } else {
        // Handle registration failure
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
    console.log("Form submitted:", formData);
    // toast.success("Form submitted");
  };
  const handleSocialLogin = (provider) => {
    // Implement social media login logic here
    // toast.success(`Logging in with ${provider}`);
  };
  const formFields = [
    {
      label: "Email address",
      type: "email",
      id: "email",
      placeholder: "leroy@jenkins.com",
      value: formData.email,
      onChange: handleInputChange,
    },
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
      id: "password1",
      placeholder: "*****",
      value: formData.password,
      onChange: handleInputChange,
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "password2",
      placeholder: "*****",
      value: formData.password,
      onChange: handleInputChange,
    },
  ];

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
      <CustomCard header="Sign Up" subtitle="Register your account here">
        <CustomForm formFields={formFields} onSubmit={handleSubmit} />
        <Link to="/signIn">Already have an account</Link>
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
};

export default SignUp;
