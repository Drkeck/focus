import { useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../../utils/queries';
import { UPDATE_MESSAGES } from '../../utils/actions'
import io from 'socket.io-client';

function MessageLog() {
    // gets and stores messages from the server
    const {data, loading} = useQuery(ME);
    const user = data?.Me || {};
    const {focus, messages} = useSelector((state) => {
        return state
    });

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
    }, [dispatch])

    if(!loading) {
        socketRef.current.emit('sendNickname', user.username)
    }

    // sending messages to the server.
    const sendMessage = ( message) => {
        // send message to server.
        socketRef.current.emit("DM", {
            to : focus,
            message: message
        });
    };

    return { messages, sendMessage};
}

export default MessageLog;