import React from 'react';
import { useDispatch } from 'react-redux';
import { FOCUSED_USER } from '../../utils/actions'
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../../utils/queries';


function FriendsList() {
    const { data, loading } = useQuery(ME)
    const friends = data?.Me?.friends || [{}]

    const dispatch = useDispatch();
    
    function handleChange(event) {
        event.persist();
        const {textContent} = event.target;
        console.log(textContent)
        dispatch({
            type: FOCUSED_USER,
            focus: textContent
        })
    }
    return (
        <div>
            {friends.map((frnd, index) => (
            <div key={index} onClick={handleChange}>
                <h5 value={frnd.username}>{frnd.username}</h5>
            </div>
            ))}
        </div>
    )
}

export default FriendsList;