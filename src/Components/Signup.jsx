import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../Context/Main/MainContext.jsx";

const Signup = ({ updateLoginFlag }) => {
  const context = useContext(MainContext);
  const { createUser } = context;

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    updateLoginFlag(true);

    return function cleanup() {
      updateLoginFlag(false);
    };
  }, []);

  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    if (confirmPassRef.current.value !== passwordRef.current.value) {
      setMessage("Password and confirm password do not match");
      return;
    }

    const user = createUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });

    if (user) navigate("/");
    else setMessage("Internal error try again");
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img
          className="amazon-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png"
          alt=""
        ></img>
      </Link>

      <div className="login-form-container">
        <div className="login-form">
          <h1>Sign up </h1>

          <form onSubmit={handleSubmitSignUp}>
            <strong>Username</strong>
            <input ref={nameRef} type="text" required />
            <strong>E-mail</strong>
            <input ref={emailRef} type="email" required />
            <strong>Password</strong>
            <input ref={passwordRef} type="password" required />
            <strong>Confirm password</strong>
            <input ref={confirmPassRef} type="password" required />
            <button type="submit">Sign Up</button>
          </form>

          <p style={{ color: "red", fontSize: "12px" }}>{message}</p>
          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
        </div>

        <div className="mc-2" style={{ fontSize: "10px" }}>
          New to Amazon?
        </div>

        <Link to="/login">
          <button className="login-form-redirect-btn mc-2">
            Get back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
