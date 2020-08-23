// page for navbar component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from '../pages/SignupForm';
import LoginForm from '../pages/LoginForm';
import VideoForm from '../pages/VideoForm';
import Auth from '../utils/auth';


const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal, showVideoModal, setShowVideoModal] = useState(false);
  return (
    <>
    <Container fluid>
      <Navbar bg='danger' className="top-nav" variant='dark' expand='lg'>
        <Link to="/">
          <Navbar.Brand className="title-nav">Focus</Navbar.Brand>
        </Link>          
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto' >
            
              {/* <Nav.Link as={Link} to='/'>
                Placeholder
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    Saved Searches
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to='/messages'>Chat</Nav.Link>
                </>
              ) : (
                <>
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                <Nav.Link onClick={() => setShowModal(true)}>Chat</Nav.Link>
                </>
              )}
              <Nav.Link onClick={() => setShowModal(true)}>Video Call</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey={Auth.loggedIn()? 'video-call' : 'login'}>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='video-call'>Video Call</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='video-call'>
                <VideoForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>


      

      {/* <Modal
        size='lg'
        show={showVideoModal}
        onHide={() => setShowVideoModal(false)}
        aria-labelledby='video-modal'>
        tab container to do either signup or login component
        <Tab.Container defaultActiveKey='video'>
          <Modal.Header closeButton>
            <Modal.Title id='video-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='video'>Video</Nav.Link>
                </Nav.Item>
          
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='video'>
                <VideoForm handleModalClose={() => setShowVideoModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal> */}

      
      </Container>
    </>
  );
};

export default AppNavbar; 