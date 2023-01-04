import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [validEmail, setValidEmail] = useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const validateEmail = (e) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setValidEmail(false);
      setemail(e.target.value);
    } else {
      setValidEmail(true);
    }
  };

  const onSubmit = () => {
    if (email.length > 0 && validEmail == false) {
      axios
        .post("http://localhost:5000/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      console.log("Input a valid Email");
    }
  };


  return (
    <div>
      <div className="reg_title">Login</div>
      <div className="form">
        <div className="form-body">
          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              onChange={validateEmail}
              placeholder="Email"
            />
            {validEmail == true ? "Input a valid Email" : ""}
          </div>
          <div className="password">
            <label className="form__label" for="password">
              Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="footer">
          <button type="submit" onClick={onSubmit} class="btn">
            Login
          </button>
        </div>
        <div className="no_account">
          <span>Do you haven't an account?</span>
          <Link to="/registation" className="link">
            <span>Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
