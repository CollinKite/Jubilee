import React from 'react';
import Logo from '../components/logo';
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginError = () => toast.error('Invalid Login', {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });;

const emptyError = () => toast.error('Please fill out all fields.', {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });;

const loginSuccess = () => toast.success('Login Success', {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
  

  
const login = () => {
  
  return (
    <div id="loginpage">
      <Logo/>
        <div id="card">
          <h1>Welcome Back!</h1>
          <input id="email" type="text" placeholder="Email" />
          <br/>
          <input id="password" type="password" placeholder="Password" />
          <br/>
          <button id="submit" onClick={auth}>Login</button>
          <br/>
          <a href="/forgot">Forgot Password?</a>
          <br/>
          <a href="/signup">Don't have an account?</a>
        </div>
        <ToastContainer limit={1}/>
    </div>
  );
};

function disabledLogin()
{
  document.getElementById("submit").disabled = true;
  document.getElementById("submit").innerHTML = "Logging In...";
  document.getElementById("submit").style.backgroundColor = "#e6e6e6";
  document.getElementById("submit").style.color = "#000000";
}

function enableLogin(text)
{
  document.getElementById("submit").disabled = false;
  document.getElementById("submit").innerHTML = "Login"; 
  document.getElementById("submit").style.backgroundColor = "#0088ff";
  document.getElementById("submit").style.color = "#ffffff";
}

async function auth() {
  disabledLogin();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "" || password === "") {
    emptyError();
    enableLogin();
    return;
  } 
  else {
    const reponse = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email
      , password: password }),
    });
    const data = await reponse;
    if (data.status === 200) {
      loginSuccess();
      //print the token from the response
      let token = (await data.json()).token;
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));
      setTimeout(function(){ window.location.href = "/home"; }, 2000);
    } else {
      loginError();
      enableLogin();
    }
  }
}

export default login;