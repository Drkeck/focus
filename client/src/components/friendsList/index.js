import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FOCUSED_USER } from '../../utils/actions'
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../../utils/queries';
import { Spinner } from 'react-bootstrap';


function FriendsList() {
    const focus = useSelector(state => {
        return state.focus
    })
    const { data, loading } = useQuery(ME)
    const friends = data?.Me?.friends || [{}]

    const dispatch = useDispatch();
    
    function handleChange(event) {
        event.persist();
        const {textContent} = event.target;
        dispatch({
            type: FOCUSED_USER,
            focus: textContent
        })
    }
    return (
        <div className="shadow">
            <h5 className="text-center">Friends:</h5>
            {loading ? <Spinner animation="border" role="status" ></Spinner> :  friends.map((frnd, index) => (
            <div key={index} onClick={handleChange} className={ focus === frnd.username ? "btn btn-primary btn-sm disabled m-1 mb-3" : "btn btn-secondary btn-sm m-1 mb-3"} >
                <p value={frnd.username} style={{margin: 0, fontSize: "2vh"}}>{frnd.username}</p>
            </div>
            ))}
        </div>
    )
}

export default FriendsList;