import React from 'react';
import './login.css'
import logo from '../images/logo512.png'

  
const login = () => {
  return (
    <div id="loginpage">
        <a href='/' id='logo'><img src={logo} alt="logo"></img></a>
        <a href='/'><h2 id='logo'>Jubilee</h2></a>
        <div id="card">
          <h1>Welcome Back!</h1>
          <input id="email" type="text" placeholder="Email" />
          <br/>
          <input id="password" type="password" placeholder="Password" />
          <br/>
          <button id="submit">Login</button>
          <br/>
          <a href="/forgot">Forgot Password?</a>
          <br/>
          <a href="/signup">Don't have an account?</a>
        </div>
    </div>
  );
};

function auth() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill out all fields.");
  } else {
    let xmlhttp = new XMLHttpRequest();
  }
}
  
export default login;