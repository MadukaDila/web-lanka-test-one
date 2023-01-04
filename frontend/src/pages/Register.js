import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [password, setpassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e) => {
    if (e.target?.value && e.target.value.match(isValidEmail)) {
      setValidEmail(false);
      setemail(e.target.value);
    } else {
      setValidEmail(true);
    }
  };

  const data = {
    username: username,
    email: email,
    contact: contact,
    address: address,
    password: password,
  };

  console.log(data);

  const onSubmit = () => {
    // console.log(e);
    if (email.length > 0 && validEmail == false) {
      axios
        .post("http://localhost:5000/signup", data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Input a valid Email");
    }
  };

  return (
    <div>
      <div className="reg_title">Register</div>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              First Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              id="firstName"
              onChange={(e) => {
                setusername(e.target.value);
              }}
              placeholder="First Name"
            />
          </div>
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
          <div className="contact_no">
            <label className="form__label" for="contact_no">
              Contact Number
            </label>
            <input
              type="text"
              name=""
              id="contact_no"
              className="form__input"
              onChange={(e) => {
                setcontact(e.target.value);
              }}
              placeholder="Contact Number"
            />
          </div>
          <div className="home_add">
            <label className="form__label" for="address">
              Address
            </label>
            <input
              type="text"
              name=""
              id="address"
              className="form__input"
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              placeholder="Address"
            />
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
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div class="footer">
          <button type="submit" onClick={onSubmit} class="btn">
            Register
          </button>
        </div>
        <div className="reg_no_account">
          <span>Do you have an account?</span>
          <Link to="/" className="reglink">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
