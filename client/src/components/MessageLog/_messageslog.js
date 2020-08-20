import { useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_MESSAGES } from '../../utils/actions'
import io from 'socket.io-client';

function MessageLog() {
    // gets and stores messages from the server
    // const [messages, setMessages] = useState([]);
    const {focus, messages} = useSelector((state) => {
        return state
    })

    const dispatch = useDispatch();

    const socketRef = useRef();

    // establishes the server connection, and deals with the messages beng received.
    useEffect(() => {
        socketRef.current = io(
            "http://localhost:3001"
        );

        socketRef.current.on(
            "direct_message", function(data) {
                dispatch({
                    type: UPDATE_MESSAGES,
                    messages: data
                })
            }
        );

        return () => {
            socketRef.current.disconnect();
        }
    }, [])

    // sending messages to the server.
    const sendMessage = (you, message, username) => {
        console.log(username, message, you);
        socketRef.current.emit('sendNickname', you);
        // socketRef.current.send(message)
        socketRef.current.emit("DM", {
            to : focus,
            message: message
        });
    };

    return { messages, sendMessage};
}

export default MessageLog;