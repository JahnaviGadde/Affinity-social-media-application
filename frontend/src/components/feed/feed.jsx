import { useContext, useEffect, useState } from "react";
import Post from "../post/post";
import Share from "../share/share"
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const API_URL = "http://localhost:8080/api/posts/";
  const [posts,setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
  const fetchPosts = async () => {
    const res = username
      ? await axios.get(API_URL + "profile/" + username)
      : await axios.get(API_URL + "timeline/" + user._id);
    setPosts(res.data);
  };
  fetchPosts();
}, [username , user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
         {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}  
      </div>
    </div>
  );
}