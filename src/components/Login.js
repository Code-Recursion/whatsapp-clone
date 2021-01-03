import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import "../styles/login.css";

const Login = () => {
  const [{user}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        console.log("Auth Error", error.message);
      });
  };
  return (
    <div>
      <div className="login">
        <div className="login__container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
            alt=""></img>

          <div classNmae="login__text">
            <h1>Sign in to WhatsApp</h1>
          </div>
          <Button onClick={signIn}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
