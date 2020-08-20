import React, {useState} from 'react';
import MessageLog from '../components/MessageLog/_messageslog'
import Messages from '../components/MessageLog'
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../utils/queries';
import { useSelector } from 'react-redux'
import FriendsList from '../components/friendsList';


function Messenger () {
    const { loading, data} = useQuery(ME);
    const user = data?.Me || {};
    const focus = useSelector((state) => {
        return state.focus
    });
    const [formState, setFormState] = useState({ message: ''});
    const { messages, sendMessage } = MessageLog();

    console.log(focus)

    const SubmitHandler = async event => {
        // prevent the page from refreshing.
        event.preventDefault();
        // send the message to the server
        sendMessage(user?.username, formState.message, focus);
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
            <FriendsList />
            <Messages />
            <form 
                onSubmit={SubmitHandler} 
                style={{bottom: 0, position: "fixed", left: 0, width: `100%`}}
            >
                <input
                placeholder="Chat now!"
                onChange={handleChange}
                name="message"
                value={formState.message}
                style={{width: '80%', marginRight: 10}}
                ></input>
                <button style={{ paddingLeft: 50, paddingRight: 50}}>Submit</button>    
            </form> 
        </div>
    )
}

export default Messenger;