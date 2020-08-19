import React from 'react';

function FriendsList({username, _id}) {

    return(
        <div>
            <h4>{username}</h4>
    <p>{_id}</p>
        </div>
    )
}

export default FriendsList;