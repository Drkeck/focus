import React, {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux'

function Messages() {
    const {messages, focus} = useSelector(state => {
        return state
    })
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth"})
    }

    function messageFilter(message) {
        if(message.username === focus || message.to === focus) {
            return message
        }
    }
    
    const personalMessages = messages.filter(messageFilter);

    useEffect(scrollToBottom, [personalMessages])


    return(
        <div style={{ marginBottom: 100}}>
            {/* loops through and creates a element for all the messages coming in */}
            { personalMessages.map((message, index) => (
                message.to ? (
                <div key={index} className="d-flex flex-column text-right mb-2" >
                    <h5 style={{ marginTop: 0, marginRight: 15}} className="text-break">{message.message}</h5>
                    <p style={{ margin: 0, marginRight: 5 }} >You</p>
                </div>)
            :
                (<div key={index} className="d-flex flex-column text-left mb-2">
                    <h5 style={{ marginTop: 0, marginLeft: 15}} className="text-break">{message.message}</h5>
                    <p style={{ margin: 0, marginLeft: 5 }}>{message.username}</p>
                </div>
            )))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages;