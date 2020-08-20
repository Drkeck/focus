import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

import coverImg from '../assets/videochat.jpg';


function Login(props) {
  

  return (
    <div className="img-container">
                 <img src={coverImg} alt="People videochatting" className="cover-img"/>
                 <div className="centered-text">Welcome To Focus</div>
               </div>
  );
}


export default Login;