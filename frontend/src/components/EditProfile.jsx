import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import { Camera, CameraIcon, Mail, User, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({ user, close }) => {
    const [firstName, setFirstname] = useState(user.firstName);
    const [lastName, setLastname] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);

    const dispatch = useDispatch();

    const handleSaveProfile = async () => {
        try {
            const newData = {
                firstName: firstName,
                lastName:lastName,
                age: Number(age),
                gender: gender,
                about: about,
                skills: skills
            };
            const res = await axios.patch(BASE_URL + "/profile/edit", newData , { withCredentials: true});

            dispatch(addUser(res?.data));




            close();
            toast.success("Profile updated.");
        } catch (error) {
            console.log("error : ", error.message);
            toast.error("Oops, something went wrong. -> " + error.message);
        }
    }

    const handleSkillChange = (e) => {
        setSkills(e.target.value.split(","));
    };
  return (
    <>

    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend flex justify-between items-center w-full">
            <span>Edit Profile</span>
            <button onClick={close} className="text-gray-400 hover:text-white">
                <X size={20} />
            </button>
        </legend>

        
        <label className="fieldset-label">First name</label>
        <input type="firstName" className="input" placeholder={firstName} onChange={(e) => setFirstname(e.target.value)}/>
        
        <label className="fieldset-label">Last name</label>
        <input type="lastname" className="input" placeholder={lastName} onChange={(e) => setLastname(e.target.value)}/>

        <label className="fieldset-label">Age</label>
        <input type="age" className="input" placeholder={age} onChange={(e) => setAge(e.target.value)}/>

        <label className="fieldset-label">Gender</label>
        <select defaultValue={gender} className="select text-gray-400" onChange={(e) => setGender(e.target.value)}>
            <option disabled={true}>{gender}</option>
            <option>male</option>
            <option>female</option>
            <option>other</option>
        </select>

        <label className="fieldset-label">Skills</label>
        <input type="age" className="input" placeholder={skills[0]} value={skills.join(", ")} onChange={handleSkillChange}/>

        <fieldset className="fieldset">
            <legend className="fieldset-label">About</legend>
            <textarea className="textarea h-24" placeholder={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        </fieldset>
        
        <button className="btn btn-neutral mt-4" onClick={handleSaveProfile}>Save profile</button>
    </fieldset>
    </>
  )
}

export default EditProfile