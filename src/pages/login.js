import React from 'react';
import Logo from '../components/logo';
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginError = () => toast.error('Error Logging In, please check login details', {
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

async function auth() {
  document.getElementById("submit").disabled = true;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "" || password === "") {
    emptyError();
  } else {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8080/users/login");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function() {
        if (this.status === 200) {
            console.log("logged in");
            console.log(this.responseText);
            loginSuccess();
        }
        else
        {
          console.log("error");
          console.log(this.responseText);
          loginError();
          document.getElementById("submit").disabled = false;
          return;
        }
    }
    let login = {
      "email": email,
      "password": password
    }
    xmlHttp.send(JSON.stringify(login));    
  }
}

export default login;