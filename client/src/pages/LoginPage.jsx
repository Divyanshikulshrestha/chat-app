// import React, { useState } from "react";
// import assets from "../assets/assets";

// const LoginPage = () => {
//   const [currState, setCurrState] = useState("Sign up");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const onsubmitHandler = (event)=>{
//     event.preventDefault();
//     if(currState === "Sign up" && !isDataSubmitted){
//       setIsDataSubmitted(true)
//       return;
//     }
//   }

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
//       {/* left */}
//       <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
//       {/* right */}
//       <form onClick={onsubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
//         <h2 className="font-medium text-2xl flex justify-between items-center">
//           {currState}
//           {isDataSubmitted && (
//             <img
//               onClick={()=> setIsDataSubmitted(false)}
//               src={assets.arrow_icon}
//               alt=""
//               className="w-5 cursor-pointer"
//             />
//           )}
//         </h2>
//         {currState === "Sign up" && !isDataSubmitted && (
//           <input
//             onChange={(e) => setFullName(e.target.value)}
//             value={fullName}
//             type="text"
//             className="p-2 border border-gray-500 rounded-md focus:outline-none"
//             placeholder="Full Name"
//             required
//           />
//         )}
//         {isDataSubmitted && (
//           <>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type="email"
//               placeholder="Email Address"
//               required
//               className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               placeholder="password"
//               required
//               className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </>
//         )}
//         {currState === "Sign up" && isDataSubmitted && (
//           <textarea
//             onChange={(e) => setBio(e.target.value)}
//             value={bio}
//             rows={4}
//             className="p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="provide a short bio..."
//             required
//           ></textarea>
//         )}
//         <button
//           type="submit"
//           className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
//         >
//           {currState === "Sign up" ? "Create Account" : "Login Now"}
//         </button>
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <input type="checkbox" />
//           <p>Agree to the terms of use & privacy policy.</p>
//         </div>
//         <div className="flex flex-col gap-2">
//           {currState === "Sign up" ? (
//             <p className="text-sm text-gray-600">
//               Already have an account?
//               <span
//                 onClick={() => {
//                   setCurrState("Login");
//                   setIsDataSubmitted(false);
//                 }}
//                 className="font-medium text-violet-500 cursor-pointer"
//               >
//                 Login here
//               </span>
//             </p>
//           ) : (
//             <p className="text-sm text-gray-600">
//               Create an account
//               <span
//                 onClick={() => {
//                   setCurrState("Sign up");
//                 }}
//                 className="font-medium text-violet-500 cursor-pointer"
//               >
//                 Click here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;










import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onsubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign up") {
      if (!isDataSubmitted) {
        setIsDataSubmitted(true);
        return;
      }

      if (!fullName || !email || !password || !bio) {
        alert("Please fill in all fields.");
        return;
      }

      console.log("Sign Up Data:", { fullName, email, password, bio });
      alert("Account Created Successfully!");

      // Reset fields
      setFullName("");
      setEmail("");
      setPassword("");
      setBio("");
      setIsDataSubmitted(false);
    } else {
      // Login flow
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      console.log("Login Data:", { email, password });
      alert("Logged in Successfully!");

      // Reset fields
      setEmail("");
      setPassword("");
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
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && currState === "Sign up" && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        {(currState === "Login" || isDataSubmitted) && (
          <>
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
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
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
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {/* Toggle Auth State */}
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          {currState === "Sign up" ? (
            <p>
              Already have an account?
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer ml-1"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account
              <span
                onClick={() => {
                  setCurrState("Sign up");
                  setIsDataSubmitted(false);
                }}
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
