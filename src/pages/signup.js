import React from 'react';
import './signup.css'
  
const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form id={"form"} onSubmit={submit}>
          <input type={"text"} placeholder={"Full Name"} className={"input"}/>
          <input type={"text"} placeholder={"Email"} className={"input"}/>
          <input type={"text"} placeholder={"Phone Number"} className={"input"}/>
          <input type={"password"} placeholder={"Password"} className={"input"}/>
          <input type={"password"} placeholder={"Confirm Password"} className={"input"}/>
          <input type={"submit"} className={"submit"}/>
      </form>
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