import React, {useState} from 'react';
import MessageLog from '../components/MessageLog/_messageslog'
import Messages from '../components/MessageLog'
import FriendsList from '../components/friendsList';


function Messenger () {
    const [formState, setFormState] = useState({ message: ''});
    const { sendMessage } = MessageLog();


    const SubmitHandler = async event => {
        // prevent the page from refreshing.
        event.preventDefault();
        // send the message to the server
        sendMessage(formState.message);
        // set message state back to empty
        setFormState({ message: ''});
    }

    const handleChange = event => {
        // deconstruct the event so it targets the "message" and the input of the message.
        const { name, value } = event.target;
        // set the form state to the new input so when the user hits submit it send the formState to the server.
        setFormState({
            ...formState,
            [name]: value
        })
    }

    return (
        <div>
            <div>
                <FriendsList />
            </div>
            <div>
                <Messages />
                <form 
                    onSubmit={SubmitHandler} 
                    style={{bottom: 0, position: "fixed", left: 0, width: `100%`, height: "8%", flexDirection: "row", paddingLeft: 10, paddingRight: 10}}
                >
                    <input
                    placeholder="Chat now!"
                    onChange={handleChange}
                    name="message"
                    autoComplete="off"
                    value={formState.message}
                    className="mr-2 p-2"
                    />
                    <button className="ml-2">Submit</button>    
                </form>
            </div>
        </div>
    )
}

export default Messenger;