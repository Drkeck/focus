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
        console.log(textContent)
        dispatch({
            type: FOCUSED_USER,
            focus: textContent
        })
    }
    return (
        <div>
            {loading ? <Spinner animation="border" role="status" ></Spinner> :  friends.map((frnd, index) => (
            <div key={index} onClick={handleChange} className={ focus === frnd.username ? "btn btn-primary disabled m-2" : "btn btn-secondary m-2"} >
                <h5 value={frnd.username}>{frnd.username}</h5>
            </div>
            ))}
        </div>
    )
}

export default FriendsList;