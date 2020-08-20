import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import ScriptTag from 'react-script-tag';

function Video(props) {

  useEffect(() => {
    const script1 = document.createElement('script');
  
    script1.src = "https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js";
    script1.async = true;
  
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
  
    script2.src = "/socket.io/socket.io.js";
    script2.async = true;
  
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
  
    script3.src = "room.js";
    script3.async = true;
  
    document.body.appendChild(script3);
  
    return () => {
      document.body.removeChild(script1);
    }
  }, []);
//   const [formState, setFormState] = useState({ email: '', password: '' })
//   const [login, { error }] = useMutation(LOGIN);

//   const handleFormSubmit = async event => {
//     event.preventDefault();
//     try {
//       const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
//       const token = mutationResponse.data.login.token;
//       Auth.login(token);
//     } catch (e) {
//       console.log(e)
//     }
//   };

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };

  return (
    <div className="container my-1">
        <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

        <script src="/socket.io/socket.io.js" defer></script>
        <ScriptTag>
          
          </ScriptTag>
      <div className="video-grid">
        {/* <h1>DOES THIS EVEN WORK</h1> */}
      </div>
      
    </div>
  );
}


export default Video;