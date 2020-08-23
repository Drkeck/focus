import React, {useEffect} from 'react';
import {useQuery} from '@apollo/react-hooks';
import { ME } from '../utils/queries';
import { Button, Spinner } from 'react-bootstrap';
import Auth from '../utils/auth';

function ManageFriends() {
    const {data, loading} = useQuery(ME)
    const friends = data?.Me.friends || {} ;

    useEffect(() => {
        if (!Auth.loggedIn()) {
            window.location.replace('/')
        }
    })

    console.log(friends)
    function HandleRemove(e) {
        const userId = e.target.value
        console.log(userId)
    }

    return (
        <div className="row justify-content-center">
        {loading? <Spinner /> : friends.map((friend) => (
            <div key={friend._id} className="card col-md-4 m-4">
                <h3 className="text-center">{friend.username}</h3>
                <Button value={friend._id} className="btn-danger m-4" onClick={HandleRemove}>Remove Friend</Button>
            </div>
        ))}
        </div>
    )
}

export default ManageFriends