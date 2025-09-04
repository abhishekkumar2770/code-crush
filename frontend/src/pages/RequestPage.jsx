import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequestsFeed, removeRequest } from '../utils/requestsSlice'

const RequestPage = () => {
    const requests = useSelector(store => store.requestsFeed);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/pending", { withCredentials: true });

            dispatch(addRequestsFeed(res?.data?.data));

        } catch (error) {
            console.log("Error : ", error.message);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            
            dispatch(removeRequest(_id));
            
        } catch (error) {
            console.log("error : ", error.message);
        }
    }
    useEffect(() =>{
        fetchRequests();
    }, []);


    if(!requests || requests.length === 0) return (
        <div className="text-center my-10">
            <h2> No request found. </h2>
        </div>
    );

  return (
    <div className="flex justify-between flex-col items-center gap-5 my-10 w-full">
        { requests.map((request) => {
            const { _id, firstName, lastName, age, gender, photoUrl, skills, about} = request.fromUserId;

            return (
                <div key={_id}  className="flex justify-between items-center flex-row gap-3 bg-base-300 rounded-xl w-1/2 p-3 text-left">
                    <div className="flex justify-start items-center flex-row gap-3 bg-base-300 rounded-xl w-1/2 p-3 text-left">
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
                    <div className="flex justify-between flex-row gap-5">
                        <button className="btn btn-success" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        <button className="btn btn-error" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                    </div>
                </div>
            );
        })
    }
    </div>
  )
}

export default RequestPage