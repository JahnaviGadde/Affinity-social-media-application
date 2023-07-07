import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./topbar.css";
import { Search  } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext} from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { logoutcall } from '../../apiCall';
import axios from 'axios';

function CollapsibleExample() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const API_URL = "http://localhost:8080/api";
  
  const handleSearch = async (e) =>{
     e.preventDefault();
     const res = await axios.get(API_URL +`/users?username=${username}`);
     if(!res.data){
      alert("user doesn't exist");
     }
     else {
       history(`/profile/${username}`);
     }
  }

  const LogoutButton = (e) => {
    logoutcall( dispatch );
    navigate(`/login`);
    window.location.reload(true);
    console.log("hi");
  }

  return (
  
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark" sticky="top">
      <Container>
      <Link to="/" style={{ textDecoration: "none" }}>
          <span className="NavBrand">Affinity</span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <form onSubmit={handleSearch} >
          <div className="searchbar">
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type='submit' className='searchsubmit'>
          <Search className="searchIcon" />
          </button>
         </div>
          </form>
          </Nav>
          <Nav>
        <div className="topbarRight">
        <div className="topbarLinks">
          <Link to = "/" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Homepage</span>
          </Link>
          <Link to = "/messenger" style={{ textDecoration: "none" }}>
          <span className="topbarLink">Messenger</span>
          </Link>
          
          <button className='logout' onClick = {LogoutButton} disabled = {isFetching} > Logout</button>
          
        </div>
        <div className="topbarIcons">
          <Link to={`/profile/${user.username}`}>
          <img
          crossorigin="anonymous" 
          src={
            user.profilePicture
            ? PF + user.profilePicture
            : PF + "defaultprofilepic.jpg"
          } alt="" className="topbarImg"/>
          </Link>
        </div>
        </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;