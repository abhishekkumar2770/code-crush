import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from "../utils/feedSlice";
import UserCard from '../components/UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
  
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
  
      if (res.data && Array.isArray(res.data.data)) {
        dispatch(addFeed(res.data.data)); 
      } else {
        toast.error("Somwthing went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  

  useEffect(() => {
      getFeed();
  }, [])

  if(feed.length === 0) return (
    <div className="text-center my-10">
      <h2> No new user. </h2>
    </div>
  );

  return (
    <div className="flex justify-center my-10">
    {feed && feed.length > 0 ? (
      <UserCard user={feed[0]} />
    ) : (
      <span className="loading loading-spinner loading-xl"></span>
    )}
  </div>
  )
}

export default Feed