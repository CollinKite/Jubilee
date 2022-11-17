import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'
import './login.css'
  
const SignUp = () => {
  return (
    <div>
      <Logo/>
      <div id="card">
        <a href='/' id='back'><img src={back} alt="back icon"></img></a>
        <h1>Sign Up</h1>
        <form id={"form"} onSubmit={submit}>
            <input type={"text"} placeholder={"Full Name"} className={"input"}/>
            <br/>
            <input type={"text"} placeholder={"Email"} className={"input"}/>
            <br/>
            <input type={"text"} placeholder={"Phone Number"} className={"input"}/>
            <br/>
            <input type={"password"} placeholder={"Password"} className={"input"}/>
            <br/>
            <input type={"password"} placeholder={"Confirm Password"} className={"input"}/>
            <br/> 
            <button id="submit" onClick={"submit"}>Login</button>
        </form>
      </div>
    </div>
  );
};

function submit() {
    let form = document.getElementById("form")
    let inputs = Array.from(form.getElementsByTagName('input'));
    for (let input of inputs){
        if(input.getAttribute('type') !== 'submit'){
            if(input.value === ""){
                alert("Enter all fields before submitting")
                break
            }
            console.log(input.value)
        }

    }
}


  
export default SignUp;