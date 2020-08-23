import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { USERS } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations'
import { Button } from 'react-bootstrap';


function FriendFinder(username) {
    const[searchedUsers, setSearchedUsers] = useState({ search: '' });
    const [addFriend, {error}] = useMutation(ADD_FRIEND);
    const { data, loading } = useQuery(USERS, {
        pollInterval: 500
    });
    // set up data
    const queryData = data?.users || [];
    //change event for search data
    function handleChange(event) {
        const { name, value } = event.target
        setSearchedUsers({
            [name]: value
        })
    }
    // filter results by search
    const searchResults = queryData.filter(result => {
        if(result?.username === username.username) {
            return
        }

        return result?.username?.toLowerCase().indexOf(searchedUsers.search.toLowerCase()) !== -1
    })
    console.log(searchResults, username.username)

    async function handleAddFriend(event) {
        const userId = event.target.value
        try {
            await addFriend({
                variables: { userId: userId }})
        } catch(e) {
            console.error(e);
            console.error(error)
        }
    }

    return(
        <>
        <input
        placeholder="search for friends"
        autoComplete="off"
        onChange={handleChange}
        name="search"
        value={searchedUsers.search}
        className="mt-4 bg-white shadow"
        />
        {searchedUsers.search === '' ? <h3 className="text-center">start typing to search</h3> : searchResults.map(result => (
            <div className="card my-2 shadow" key={result._id}>
                <h4 className="text-center m-3">{result.username}</h4>
                <Button value={result._id} className="btn-success m-2" onClick={handleAddFriend}>Add {result.username}</Button>
            </div>
        ))}
        </>
    )
}

export default FriendFinder