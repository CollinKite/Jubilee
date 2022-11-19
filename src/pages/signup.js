import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs'


const emptyError = () => toast.error('Please fill out all fields', {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });;

  const passError = () => toast.error('Passwords Don\'t Match', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;

    
    const signUpError = () => toast.error('Account With Phone or Email Already Exists!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;
    
    const connError = () => toast.error('Can\'t Connect to server, Check Your Connection and Try Again.', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;

    const emailError = () => toast.error('Invalid Email, Please Try Again.', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;

    const phoneError = () => toast.error('Invalid Phone Number, Please Try Again.', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;
    
    const signUpSuccess = () => toast.success('Sign Up Success', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    const SignUp = () => {
      return (
        <div>
      <Logo/>
      <div id="card">
        <a href='/' id='back'><img src={back} alt="back icon"></img></a>
        <h1>Sign Up</h1>
            <input id="name" type={"text"} placeholder={"Full Name"} className={"input"}/>
            <br/>
            <input id="email" type={"text"} placeholder={"Email"} className={"input"}/>
            <br/>
            <input id="phone" type={"tel"} placeholder={"Phone Number"} className={"input"} />
            <br/>
            <input id="pass" type={"password"} placeholder={"Password"} className={"input"}/>
            <br/>
            <input id="passConf" type={"password"} placeholder={"Confirm Password"} className={"input"}/>
            <br/> 
            <button id="submit" onClick={signup}>Sign Up</button>
      </div>
      <ToastContainer limit={1}/>
    </div>
  );
};


async function signup() {
  //create array of all input fields
  document.getElementById("submit").disabled = true;
  let inputs = document.getElementsByClassName("input");
  for (let input of inputs){
    if(input.value === ""){
        emptyError();
        document.getElementById("submit").disabled = false;
        return;
    }
  } 
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let pass = document.getElementById("pass").value;
  let passConf = document.getElementById("passConf").value;

  if (pass !== passConf){
    passError();
    document.getElementById("submit").disabled = false;
    return;
  }

  if (!validateEmail(email)){
    emailError();
    document.getElementById("submit").disabled = false;
    return;
  }

  if(!validatePhone(phone)){
    phoneError();
    document.getElementById("submit").disabled = false;
    return;
  }

  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "http://localhost:8080/users/register");
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.onreadystatechange = function() {
    if (this.status === 200) {
        console.log("sign up success");
        signUpSuccess();
        sleep(2000).then(() => {
          window.location.replace("/");
        });
    }
    else if (this.status === 401){
      signUpError();
      document.getElementById("submit").disabled = false;
      return;
    }
    else
    {
      console.log("error");
      connError();
      document.getElementById("submit").disabled = false;
      return;
    }
  }
  let entry = {
    "name": name,
    "email": email,
    "phone": phone,
    "password": hashPassword(pass)
  }
  // xmlHttp.send(JSON.stringify({name, email, phone, pass})); 
  xmlHttp.send(JSON.stringify(entry));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//regex function to check if email is valid
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//regex function to validate phone number
function validatePhone(phone)
{
  var re = /[0-9]{10}/;
  return re.test(phone);
}

//function to hash password with bcryptjs
function hashPassword(password){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}


export default SignUp;