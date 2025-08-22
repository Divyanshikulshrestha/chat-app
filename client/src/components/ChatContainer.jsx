import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext); // ✅ include getMessages
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [messageText, setMessageText] = useState("");

  // Load messages whenever user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send text message
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!messageText.trim()) return;
    await sendMessage({ text: messageText.trim() });
    setMessageText("");
  };

  // Send image message
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG/JPEG)");
      return;
    }

    // Optional: size limit 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be under 2MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = ""; // reset input
    };
    reader.readAsDataURL(file);
  };

  // Fallback UI when no user selected
  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
        <img src={assets.logo_icon} className="max-w-16" alt="Logo" />
        <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="User"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) ? (
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-gray-400 inline-block"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="Help" className="max-md:hidden max-w-5" />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.length === 0 && (
          <p className="text-white text-sm text-center mt-10">
            Start the conversation...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 mb-4 ${
              msg.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt="Sent"
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all text-white bg-violet-500/30 ${
                  msg.senderId === authUser._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt="Sender"
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
              {msg.senderId === authUser._id && (
                <p className="text-[10px] text-gray-400">
                  {msg.seen ? "Seen" : "Sent"}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-black/20"
      >
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleSendImage}
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Upload"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer"
          onClick={handleSendMessage}
        />
      </form>
    </div>
  );
};

export default ChatContainer;
