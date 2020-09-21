import React, { useState } from "react";
import "./loginStyles.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = e => {
    e.preventDefault();
    // firebase login
    auth.signInWithEmailAndPassword(email, password)
    .then(auth => {
      history.push("/");
    })
    .catch(error=>alert(error.message))
  };

  const register = e => {
    e.preventDefault();
    // firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        // it successfully created a new user with email and password.
        if (auth) {
          history.push("/");
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signinButton"
          >
            Sign IN
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's FakeClone Conditions of Use and
          Privacy Notice.
        </p>
        <hr></hr>
        <p className="or">or</p>
        <button
          type="submit"
          onClick={register}
          className="login__registerButton"
        >
          Create your Amazon Acc
        </button>
      </div>
    </div>
  );
}

export default Login;
