import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [authMode, setAuthMode] = useState("signup"); // "signup" or "login"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { login } = useContext(AuthContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim() || (authMode === "signup" && (!fullName.trim() || !bio.trim()))) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the terms.");
      return;
    }

    try {
      await login(authMode, { fullName, email, password, bio });
      toast.success(authMode === "signup" ? "Account Created Successfully!" : "Logged in Successfully!");

      // Reset fields after successful login/signup
      setFullName("");
      setEmail("");
      setPassword("");
      setBio("");
      setAgreeTerms(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left - Logo */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* Right - Form */}
      <form
        onSubmit={onsubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg min-w-[280px]"
      >
        <h2 className="font-medium text-2xl">{authMode === "signup" ? "Sign Up" : "Login"}</h2>

        {authMode === "signup" && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {authMode === "signup" && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            placeholder="Provide a short bio..."
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {authMode === "signup" ? "Create Account" : "Login Now"}
        </button>

        {/* Toggle Auth Mode */}
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          {authMode === "signup" ? (
            <p>
              Already have an account?
              <span
                onClick={() => setAuthMode("login")}
                className="font-medium text-violet-500 cursor-pointer ml-1"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account
              <span
                onClick={() => setAuthMode("signup")}
                className="font-medium text-violet-500 cursor-pointer ml-1"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
