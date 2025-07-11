// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ProfilePage from './pages/ProfilePage'

// const App = () => {
//   return (
//     <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
//       <Routes>
//         <Route path='/' element={<HomePage />}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/Profile' element={<ProfilePage/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App



import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import bgImage from "./assets/bgImage.svg"; // import the image directly

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
