import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Forgot_Password from './pages/forgotPassword';
import Reset_Password from './pages/resetPassword';
import Home from './pages/home';
function App() {

  return (
      <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot' element={<Forgot_Password/>} />
          <Route path='/reset-password/:userId/:token' element={<Reset_Password/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
