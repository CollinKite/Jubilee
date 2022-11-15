import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './pages/login';
import SignUp from './pages/signup';

function App() {
return (
	<Router>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
	</Router>
);
}

export default App;
