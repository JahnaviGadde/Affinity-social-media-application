import "./conversations.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Conversations = ({ conversation, currentUser }) => {

  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8080/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
     <img
        className="conversationImg"
        crossorigin="anonymous"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "defaultprofilepic.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>

  </div>
  );
}
