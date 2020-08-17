import React from 'react';

function Messages({messages}) {
    
    return(
        <div>
            {/* loops through and creates a element for all the messages coming in */}
            { messages.map((message, index) => (
                <div key={index}>
                    <h5 style={{ margin: 1 }}>user ???? :</h5>
                    <p style={{ marginTop: 0, marginLeft: 10, marginBottom: 10 }}>{message}</p>
                </div>
            ))}
        </div>
    )
}

export default Messages;