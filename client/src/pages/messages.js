import React from 'react';
import io from 'socket.io-client';


function Messenger () {
    const socket = io('http://localhost:3001/');

    socket.on('connect', () => {
        console.log(socket.connected);
    });

    return (
        <div>
            {!socket.connected ? (<h5>connected</h5>) : (<h5>not connected</h5>)} 
        </div>
    )
}

export default Messenger;