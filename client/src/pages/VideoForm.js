import React from "react";
import { Link } from "react-router-dom";
const { v4: uuidV4 } = require('uuid')
// import Auth from "../utils/auth";
// import { ADD_USER } from "../utils/mutations";


function JoinVideo(props) {
  const uuid= uuidV4()

  const path="/create-room/" + uuid
  const handleFormSubmit = async event => {
    // event.preventDefault();
    // const mutationResponse = await addUser({
    //   variables: {
    //     email: formState.email, password: formState.password,
    //     firstName: formState.firstName, lastName: formState.lastName
    //   }
    // });
    
  };

  // const createRoom = async event => {
  //     event.preventDefault(); 
  //       window.location.href= "localhost:3001/create-room"
  //   console.log("helo")
  //     return false;
  //     event.preventDefault()
  //     event.stopPropagation();
  //     event.nativeEvent.stopImmediatePropagation();
  //     console.log("helo")
  //     window.location.href= "localhost:3000/create-room";
  // }

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };

  return (
    <div className="join-video-container my-1">
      

      <h2 className="my-3">Join Video Call</h2>
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
      <form> 
      <div type="submit" className="create">
      <Link to={path}>
              Create Room
            </Link>
        </div>
        </form>
    </div>
  );

}

export default JoinVideo;