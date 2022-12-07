import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs'


function hashPassword(password){
    const hash = bcrypt.hashSync(password);
    return hash;
}

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

const rstPwd = async (req, res) =>
{
    let pass = document.getElementById("password").value;
    let comfPass = document.getElementById("confirm_password").value;
    let urlparams = new URLSearchParams(window.location.search);
    let token = urlparams.get("token");

    
        var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let obj = JSON.parse(jsonPayload)
    let info = [obj.email, obj.userId]

    console.log(info);
    
    

    if(pass !== comfPass)
    {
        toastMsg("Passwords do not match", false)
        return;
    }

    const reponse = await fetch('https://api.getmilos.app/users/reset-password', {
    method: 'Post',
    headers: {
        'Authorization': `Bearer ${info[0]}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: token, password: hashPassword(pass) }),
    });
    const data = await reponse;
    if (data.status === 200) {
    toastMsg(data.message, true);
    }
    else if (data.status === 401) {
    toastMsg(data.message, false);
    }
    else {
    toastMsg("Error communicating with server", false);
    }


}

const ResetPassword = () => {
    return (
        <div id="resetPasswordpage">
            <ToastContainer limit={1}/>
            <Logo/>
            <div id="card">
                <a href='/' id='back'><img src={back} alt="back icon"></img></a>
                <h1>Reset Password</h1>
                <input id="password" type="text" placeholder="Password" />
                <br/>
                <input id="confirm_password" type="text" placeholder="Confirm Password" />
                <br/>
                <button id="submit" onClick={rstPwd}>Reset</button>
            </div>
        </div>
    );
};

    export default ResetPassword;