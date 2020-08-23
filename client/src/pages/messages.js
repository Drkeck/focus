import React, {useState} from 'react';
import MessageLog from '../components/MessageLog/_messageslog'
import Messages from '../components/MessageLog'
import FriendsList from '../components/friendsList';
import { Button } from 'react-bootstrap';
import {useSelector} from 'react-redux'



function Messenger () {
    const [formState, setFormState] = useState({ message: ''});
    const { sendMessage } = MessageLog();
    const focus = useSelector(state => state.focus)


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
                {focus === '' ? <></> :
                <form 
                    onSubmit={SubmitHandler} 
                    style={{bottom: 0, position: "fixed", width: `100%`, left: 0, height: "8%", flexDirection: "row", paddingLeft: 10, paddingRight: 25}}
                >
                    <input
                    placeholder="Chat now!"
                    onChange={handleChange}
                    name="message"
                    autoComplete="off"
                    value={formState.message}
                    className="mr-2 p-2"
                    />
                    <Button size="sm" type="submit">Submit</Button>
                </form>
                }
            </div>
        </div>
    )
}

export default Messenger;