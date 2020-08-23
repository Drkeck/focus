import React, {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import { ME } from '../utils/queries';
import { REMOVE_FRIEND } from '../utils/mutations';
import { Button, Spinner } from 'react-bootstrap';
import Auth from '../utils/auth';
import FriendFinder from '../components/FriendFinder'

function ManageFriends() {
    const {data, loading} = useQuery(ME, {
        pollInterval: 50
    })
    const [removeFriend, { error }] = useMutation(REMOVE_FRIEND);
    const {friends, username} = data?.Me || {} ;

    useEffect(() => {
        if (!Auth.loggedIn()) {
            window.location.replace('/')
        }
    })

    async function HandleRemove(e) {
        const userId = e.target.value;
        try {
            await removeFriend({
                variables: {
                    userId: userId
                }
            })
        } catch(er) {
            console.log(er)
            console.log(error)
        }
    }

    return (
        <div className="row justify-content-center" style={{margin: 0}}>
            <div className="col-md-5">
            {loading ? <Spinner /> : friends.map((friend) => (
                <div key={friend._id} className="card m-4 shadow">
                    <h3 className="text-center mt-4">{friend.username}</h3>
                    <Button value={friend._id} className="btn-danger m-4" onClick={HandleRemove}>Remove Friend</Button>
                </div>
            ))}
            </div>
            <div className="col-md-5">
                <FriendFinder username={username} />
            </div>
        </div>
    )
}

export default ManageFriends