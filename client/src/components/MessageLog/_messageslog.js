import {useState, useRef, useEffect} from 'react';
import io from 'socket.io-client';

function MessageLog() {
    // gets and stores messages from the server
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    // establishes the server connection, and deals with the messages beng received.
    useEffect(() => {
        socketRef.current = io(
            "http://localhost:3001"
        );

        socketRef.current.on(
            "message",
            (message) => {
                setMessages( messages => [...messages, message])
            }
        );

        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    // sending messages to the server.
    const sendMessage = (username, message) => {
        console.log(username, message);
        socketRef.current.emit('sendNickname', username);
        socketRef.current.send(message);
    };

    return { messages, sendMessage};
}

export default MessageLog;