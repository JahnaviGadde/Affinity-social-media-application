import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h3 className="loginlogo">Affinity</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginright">
          <form className="loginbox" onSubmit={handleClick}>
            <input placeholder="Email" type = "email" required className="loginInput" ref = {email} />
            <input placeholder="Password" type =  "password" className="loginInput" ref = {password} />
            <button className="loginButton" type="submit" disabled={isFetching}>
             Login
            </button>
          </form>
           <Link to = "/register">
            <button className="loginregisterButton">
              Create a new account
            </button>
           </Link>
        </div>
      </div>
    </div>
  );
}