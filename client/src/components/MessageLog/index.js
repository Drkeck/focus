import React from 'react';
import {useSelector} from 'react-redux'

function Messages() {
    const {messages, focus} = useSelector(state => {
        return state
    })

    function messageFilter(message) {
        if(message.username === focus || message.to === focus) {
            return message
        }
    }

    const personalMessages = messages.filter(messageFilter);
    
    return(
        <div style={{ marginBottom: 25}}>
            {/* loops through and creates a element for all the messages coming in */}
            { personalMessages.map((message, index) => (
                message.to ? (
                <div key={index} className="d-flex flex-column text-right" >
                    <h5 style={{ marginTop: 0, marginRight: 10}}>{message.message}</h5>
                    <p style={{ marginRight: 5 }} >You</p>
                </div>)
            :
                (<div key={index} className="d-flex flex-column text-left">
                    <h5 style={{ marginTop: 0, marginLeft: 10}}>{message.message}</h5>
                    <p style={{ marginLeft: 5 }}>{message.username}</p>
                </div>
            )))}
        </div>
    )
}

export default Messages;