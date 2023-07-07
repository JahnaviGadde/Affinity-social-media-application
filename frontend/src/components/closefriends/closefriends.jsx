import "./closefriends.css";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" crossorigin="anonymous" src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "defaultprofilepic.jpg"
              } alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}