import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(authUser?.profilePic || assets.logo_icon);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const navigate = useNavigate();

  // Preview selected image
  useEffect(() => {
    if (!selectedImg) return;

    const objectUrl = URL.createObjectURL(selectedImg);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // cleanup
  }, [selectedImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !bio.trim()) {
      toast.error("Name and bio cannot be empty!");
      return;
    }

    try {
      let profileData = { fullName: name.trim(), bio: bio.trim() };

      if (selectedImg) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onloadend = async () => {
          profileData.profilePic = reader.result;
          await updateProfile(profileData);
          toast.success("Profile updated successfully!");
          navigate("/");
        };
      } else {
        await updateProfile(profileData);
        toast.success("Profile updated successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl backdrop-blur-2xl text-gray-300 border border-gray-600 flex items-center justify-between gap-10 max-sm:flex-col-reverse rounded-lg p-6">
        {/* Profile Preview Image */}
        <img
          className="w-44 h-44 rounded-full object-cover max-sm:mt-6"
          src={previewUrl}
          alt="Profile Preview"
        />

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <h3 className="text-2xl font-semibold mb-2">Profile Details</h3>

          {/* Upload Avatar */}
          <label htmlFor="avatar" className="flex items-center gap-4 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={previewUrl}
              alt="avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            <span>Upload Profile Image</span>
          </label>

          {/* Name Input */}
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio Input */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write Profile Bio"
            required
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Save Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white py-2 px-6 rounded-full text-lg hover:opacity-90 transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
