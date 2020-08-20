import React from 'react';
import {useSelector} from 'react-redux'

function Messages() {
    const messages = useSelector(state => {
        return state.messages
    })
    return(
        <div style={{ marginBottom: 25}}>
            {/* loops through and creates a element for all the messages coming in */}
            { messages.map((message, index) => (
                <div key={index}>
                    <h5 style={{ margin: 1 }}>{message.username}</h5>
                    <p style={{ marginTop: 0, marginLeft: 10, marginBottom: 10 }}>{message.message}</p>
                </div>
            ))}
        </div>
    )
}

export default Messages;