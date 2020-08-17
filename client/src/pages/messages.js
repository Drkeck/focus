import React, {useState} from 'react';
import MessageLog from '../components/MessageLog';


function Messenger () {
    const [formState, setFormState] = useState({ message: ''})
    const { messages, sendMessage } = MessageLog();

    // establish the url to the server side.


    const SubmitHandler = async event => {
        // prevent the page from refreshing
        event.preventDefault();
        // send the message to the server
        sendMessage(formState.message)
        // set message state back to empty
        setFormState({ message: ''})
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
            {messages.map((message, index) => (
                <div key={index}>
                    <h5>{message}</h5>
                    <p>new message</p>
                </div>
            ))}
            <form onSubmit={SubmitHandler}>
                <textarea
                placeholder="Chat now!"
                onChange={handleChange}
                name="message"
                value={formState.message}
                ></textarea>
                <button>Submit</button>    
            </form> 
        </div>
    )
}

export default Messenger;