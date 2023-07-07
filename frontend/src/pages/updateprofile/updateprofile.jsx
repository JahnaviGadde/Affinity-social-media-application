import { useContext, useRef } from "react"
import "./updateprofile.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Updateprofile = () => {
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const password = useRef();
    const {user} = useContext(AuthContext);
    const Navigate = useNavigate();

    const handleUpdate  = (e) =>{
        e.preventDefault();
        const updatedprofile = {
            city : city.current.value,
            from : from.current.value,
            relationship : relationship.current.value,
            password: password.current.value,
            userId : user._id
        }
        axios.put(`http://localhost:8080/api/users/${user._id}` , updatedprofile )
        .then(response => {
            alert('User profile updated successfully');
              Navigate(`/profile/${user.username}`)
          })
          .catch(error => {
            console.error('Error updating user profile:', error);
          });
    }
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h3 className="loginlogo">Affinity</h3>
          <span className="loginDesc">
           Update profile
          </span>
        </div>
        <div className="loginright">
          <form className="loginbox" onSubmit={handleUpdate}>
            <input placeholder="password" type = "password"  className="loginInput" ref={password} />
            <input placeholder="From" type = "text"  className="loginInput" ref={city} />
            <input placeholder="City" type =  "text" className="loginInput" ref={from} />
            <input placeholder="Relationship" type =  "text" className="loginInput" ref={relationship} />
            <button className="loginButton" type="" >
            Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
