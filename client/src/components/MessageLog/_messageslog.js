import {useState, useRef, useEffect} from 'react';
import io from 'socket.io-client';

function MessageLog() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

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

    const sendMessage = ( message ) => {
        socketRef.current.send(message);
    };

    return { messages, sendMessage};
}

export default MessageLog;