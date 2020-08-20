import React from 'react';
import Friends from './../../components/friendsList';
// import Messages from '../../components/MessageLog';
import './styles.css';

const Home = () => {
    return (
        <section className="homepage">
            <Friends />
            {/* <Messages /> */}
        </section>
    );
};

export default Home;