import React, { useState } from "react";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";
import { CameraIcon, Mail, User, VenusAndMars, Cake, Trophy } from "lucide-react";

const ProfilePage = () => {
  const user = useSelector((store) => store.user);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      // await updateProfile({ profilePic: base64Image });
    };
  };

  //  If no user in Redux, show message
  if (!user || !user.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">You are not logged in. Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <>
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <EditProfile user={user.data} close={() => setShowEditProfile(false)} />
        </div>
      )}

      <div className="flex-1 py-5 m-5">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || user?.data?.photoUrl}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
                >
                  <CameraIcon className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.data?.firstName} {user?.data?.lastName}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.data?.emailId}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Cake className="w-4 h-4" />
                  Age
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.data?.age}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <VenusAndMars className="w-4 h-4" />
                  Gender
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.data?.gender}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Skills
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {user?.data?.skills?.length > 0
                    ? user.data.skills.join(", ")
                    : "No skills added"}
                </p>
              </div>
            </div>

            <div className="flex justify-center" onClick={() => setShowEditProfile(true)}>
              <button className="bg-primary w-[50%] h-10 rounded-lg">Edit profile</button>
            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{user?.data?.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
