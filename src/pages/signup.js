import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs'


function toastMsg(message, boolSuccess)
{
  const props = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  if (boolSuccess)
  {
    toast.success(message, props);
  }
  else
  {
    toast.error(message, props);
  }
}

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
  disabledSignUp();
  let inputs = document.getElementsByClassName("input");
  for (let input of inputs){
    if(input.value === ""){
      toastMsg("Please fill out all fields", false);
      enableSignUp();
      return;
    }
  } 
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let pass = document.getElementById("pass").value;
  let passConf = document.getElementById("passConf").value;

  if (pass !== passConf){
    toastMsg("Passwords do not match", false);
    enableSignUp();
    return;
  }

  if (!validateEmail(email)){
    toastMsg("Please enter a valid email", false);
    enableSignUp();
    return;
  }

  if(!validatePhone(phone)){
    toastMsg("Please enter a valid phone number", false);
    enableSignUp();
    return;
  }
  const reponse = await fetch('http://localhost:8080/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name, email: email, phone: phone, password: hashPassword(pass) }),
  });
  const data = await reponse;
  if (data.status === 200) {
    toastMsg("Account created successfully", true);
    console.log(await data.json());
    setTimeout(function(){ window.location.href = "/"; }, 2000);
  }
  else if (data.status === 401) {
    toastMsg("Email/Phone already in use", false);
    enableSignUp();
  }
   else {
    toastMsg("Error communicating with server", false);
    enableSignUp();
  }
}

function disabledSignUp()
{
  document.getElementById("submit").disabled = true;
  document.getElementById("submit").innerHTML = "Signing Up...";
  document.getElementById("submit").style.backgroundColor = "#e6e6e6";
  document.getElementById("submit").style.color = "#000000";
}

function enableSignUp(text)
{
  document.getElementById("submit").disabled = false;
  document.getElementById("submit").innerHTML = "Sign Up"; 
  document.getElementById("submit").style.backgroundColor = "#0088ff";
  document.getElementById("submit").style.color = "#ffffff";
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
  const hash = bcrypt.hashSync(password);
  return hash;
}


export default SignUp;