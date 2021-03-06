import React, { useEffect, useState, useRef } from 'react';
//import './App.css';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function Room() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("/");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    socket.current.on("yourID", (id) => {
      setYourID(id);
    })
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {

        iceServers: [
            {
                urls: "stun:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            },
            {
                urls: "turn:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            }
        ]
    },
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}

export default Room;

// import React, { useState, useEffect } from "react";
// import { useMutation } from '@apollo/react-hooks';
// import { Link } from "react-router-dom";
// import { LOGIN } from "../utils/mutations"
// import Auth from "../utils/auth";
// import ScriptTag from 'react-script-tag';
// import io from 'socket.io';
// //import * as io from 'socket.io-client'
// import roomjs from '../room'


// function Video(props) {
//   useEffect(() => {
//     io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
//   })
//     // const script1 = document.createElement('script');
  
//     // script1.src = "https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js";
//     // script1.async = true;
//     // script1.defer = true;
  
//     // document.body.appendChild(script1);

    
//     // const script2 = document.createElement('script');
  
//     // script2.src = "localhost:3000/socket.io/socket.io.js";
//     // script2.async = true;
  
//     // document.body.appendChild(script2);

//     // const script3 = document.createElement('script');
  
//     // script3.src = roomjs;
//     // script3.async = true;
//     // script3.defer = true;
  
//     // document.body.appendChild(script3);
  
//     // return () => {
//     //   document.body.removeChild(script1);
//     // }
//   }, []);
// //   const [formState, setFormState] = useState({ email: '', password: '' })
// //   const [login, { error }] = useMutation(LOGIN);

// //   const handleFormSubmit = async event => {
// //     event.preventDefault();
// //     try {
// //       const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
// //       const token = mutationResponse.data.login.token;
// //       Auth.login(token);
// //     } catch (e) {
// //       console.log(e)
// //     }
// //   };

// //   const handleChange = event => {
// //     const { name, value } = event.target;
// //     setFormState({
// //       ...formState,
// //       [name]: value
// //     });
// //   };

//   return (
//     <div className="container my-1">
//         <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

//         <script src="/socket.io/socket.io.js" defer></script>

        
//       <div idName="video-grid">
//         {/* <h1>DOES THIS EVEN WORK</h1> */}
//       </div>
      
//     </div>
//   );
// }


// export default Video;