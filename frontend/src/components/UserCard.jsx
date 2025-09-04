import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUser } from '../utils/feedSlice';

const UserCard = ({ user } ) => {
    const dispatch = useDispatch();

    const { firstname, lastname, age, photoUrl, gender, about } = user;

    const handleSendRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials:true });

            dispatch(removeUser(_id));

        } catch (error) {
            console.log("error : ", error.message);
        }
    }
  return (
    <>
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src= {user.photoUrl}
                alt="User Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstname + " " + lastname}</h2>
                <p>{age + ",  " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-between">
                <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", user._id)}>Ignore</button>
                <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", user._id)}>Interested</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserCard