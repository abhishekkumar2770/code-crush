import React from 'react';
import { useDispatch ,useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import Toaster from "react-hot-toast";
import { removeFeed } from '../utils/feedSlice';
import { removeConnectionsFeed } from '../utils/connectionsSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnectionsFeed());
      navigate("/login");
    } catch (error) {
      console.log("ERROR : ", error.message);
    }
    
  }
  return (
    <>
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl"><span className="text-blue-500">code -</span>crush</Link>
        </div>
        { user && (
        <div className="flex gap-1">
          <h4 className="my-2">{user?.data?.firstname + " " + user?.data?.lastname}</h4>
          <div className="dropdown dropdown-end mx-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                  <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.data?.photoUrl} />
              </div>
              </div>
              <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                  <Link to="/profile/view" className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                  </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
          </div> 
        </div> )}
    </div>
    </>
  );
}

export default Navbar