import Home from "./pages/Home/home"
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import Messenger from "./pages/messenger/messenger";
import { BrowserRouter, Route , Routes , Navigate} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Updateprofile } from "./pages/updateprofile/updateprofile";



function App() {
    const { user } = useContext(AuthContext);
    return ( 
        <BrowserRouter>
          <Routes>
          <Route exact path='/' element={user ? <Home /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/register"element = {user ? <Navigate to="/" /> : <Register />} />
          <Route path="/messenger" element = {!user ? <Navigate to="/" /> : <Messenger />} />
          <Route path="/profile/:username" element = {<Profile/>}/> 
          <Route path="/updateprofile/:username" element = {<Updateprofile/>}/> 
        </Routes>
         </BrowserRouter>
    );
}

export default App;