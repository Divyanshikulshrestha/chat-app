import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    if (messages?.length) {
      const images = messages
        .filter((msg) => msg.image)
        .map((msg) => msg.image)
        .filter((url, idx, arr) => arr.indexOf(url) === idx); // ✅ remove duplicates
      setMsgImages(images);
    } else {
      setMsgImages([]);
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="bg-[#8185B2]/10 text-white w-full relative overflow-y-auto max-md:hidden">
      {/* Profile Info */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt={`${selectedUser.fullName || "User"} profile`}
          className="w-20 aspect-square rounded-full object-cover"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
          {selectedUser.fullName || "Unnamed User"}
        </h1>
        <p className="px-10 mx-auto text-center text-sm text-gray-300">
          {selectedUser.bio || "No bio provided"}
        </p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media Section */}
      <div className="px-5 text-xs pb-20"> {/* ✅ extra padding for logout */}
        <p className="mb-1">Media</p>
        {msgImages.length > 0 ? (
          <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-3 opacity-90">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, "_blank")}
                className="cursor-pointer rounded overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Shared media ${index + 1}`}
                  className="h-full w-full rounded-md object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-6">No media shared yet</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="sticky bottom-0 bg-[#8185B2]/10 flex justify-center py-4">
        <button
          onClick={logout}
          aria-label="Logout"
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-12 rounded-full shadow-md hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
