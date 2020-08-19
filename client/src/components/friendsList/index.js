import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../../utils/queries';

function FriendsList() {
    // const[friendsList, setFriendsList] = useState({friends:{}})
    const { data, loading } = useQuery(ME)
    const friends = data?.Me?.friends || [{}]
    console.log(friends)
    return (
        <div>
            {friends?.map((frnd, index) => (
            <div key={index}>
                <h5>{frnd.username}</h5>
                <p>{frnd._id}</p>
            </div>
            ))}
        </div>
    )
}

export default FriendsList;