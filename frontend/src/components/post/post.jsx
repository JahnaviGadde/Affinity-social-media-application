import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState  ,useEffect ,useContext} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { format } from 'timeago.js';
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API_URL = "http://localhost:8080/api";
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  
  const likeHandler = () => {
    try {
      axios.put( API_URL + "/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(API_URL +`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to= {`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              crossorigin="anonymous"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "defaultprofilepic.jpg"
              }
              alt=""
            />
            </Link>
            <span className="postUsername">
             {user.username}
            </span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" crossorigin="anonymous" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" crossorigin="anonymous" src={`${PF}love.png`} onClick={likeHandler}  alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}