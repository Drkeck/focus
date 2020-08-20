import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
// import Auth from "../utils/auth";
// import { ADD_USER } from "../utils/mutations";

function JoinVideo(props) {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    // event.preventDefault();
    // const mutationResponse = await addUser({
    //   variables: {
    //     email: formState.email, password: formState.password,
    //     firstName: formState.firstName, lastName: formState.lastName
    //   }
    // });
    
  };

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };

  return (
    <div className="container my-1">
      

      <h2>Join Video Call</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Room ID:</label>
          <input
            placeholder="Room ID"
            name="roomid"
            type="roomid"
            id="room-id"
            // onChange={handleChange}
          />
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default JoinVideo;