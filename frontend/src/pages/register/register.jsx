import "./register.css";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);
      try {
        const res = await axios.post("http://localhost:8080/api/auth/register", user);
        history("/login");

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Affinity</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox"  onSubmit={handleClick}>
            <input 
             placeholder="Username"
             required
             ref={username}
             className="loginInput" />

            <input
             placeholder="Email"
             required
             ref={email}
             className="loginInput"
             type="email"/>

            <input
              placeholder="Password (only numbers)"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"/>

            <input 
             placeholder="Password Again"
             required
             ref={passwordAgain}
             className="loginInput"
             type="password" />
            <button className="loginButton" type = "submit">Sign Up</button>
          </form>
          <Link to = "/login">
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}