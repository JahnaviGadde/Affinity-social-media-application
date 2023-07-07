import "./chatonline.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Chatonline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
 

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:8080/api/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              crossorigin="anonymous"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "defaultprofilepic.jpg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
  </div>
  )
}
