import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Home from './pages/home';
function App() {

  return (
      <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
