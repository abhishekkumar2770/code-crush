import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from '../components/UserCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addConnectionsFeed } from '../utils/connectionsSlice.js';

const ConnectionPage = () => {
    const connectionsFeed = useSelector(store => store.connectionsFeed);

    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true});

            dispatch(addConnectionsFeed(res?.data?.data));

        } catch (error) {
            toast.error("Oops, something went wrong. - ", error.message);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []); 

    if(!connectionsFeed) return <Link to="/feed">Go back to feed page.</Link>;

    if(connectionsFeed.length === 0) return (
        <div className="flex justify-center my-10">
        <h1> No connections found. </h1>
        </div>
    );
    

    return (
        <div className="flex justify-center flex-col items-center gap-5 my-10 w-full">
            {connectionsFeed.map((connection) => {
                const { _id,  firstname , lastname , age, gender, photoUrl, skills, about} = connection;
                return (
                    <div key={_id}  className="flex justify-start items-center flex-row gap-3 bg-base-300 rounded-xl w-1/2 p-3">
                        <div>
                            <img src={photoUrl} className="w-28 rounded-xl"></img>
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-xl">{firstname + " " + lastname}</h2>
                            <p>{age + ", " + gender}</p>
                            <p>{skills.join(", ")}</p>
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
      
}

export default ConnectionPage