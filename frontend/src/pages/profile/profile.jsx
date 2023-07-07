import "./profile.css";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import CollapsibleExample from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const API_URL = "http://localhost:8080/api";
  const Navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(API_URL +`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <CollapsibleExample />
      <div className="profile">
      <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                crossorigin="anonymous"
                src= {user.coverPicture || PF + "defaultbackground.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                crossorigin="anonymous"
                src={user.profilePicture || PF + "defaultprofilepic.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {username}/>
            <Rightbar user = {user}/>
          </div>
        </div>
      </div>
    </>
  );
}