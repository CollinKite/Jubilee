import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import Reset from './pages/reset';

function App() {
return (
	<Router>
    <Routes>
      <Route exact path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/forgot' element={<Reset/>} />
    </Routes>
	</Router>
);
}

export default App;
