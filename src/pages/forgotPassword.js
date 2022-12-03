import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

const sendResetEmail = async () =>
{
    const email = document.getElementById("email").value
    const reponse = await fetch('http://localhost:8080/users/forgot-password', {
    method: 'Post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: email }),
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

const Forgot_Password = () => {
    console.log("reched")
    return (
        <div id="resetpage">
            <Logo/>
            <div id="card">
                <a href='/' id='back'><img src={back} alt="back icon"></img></a>
                <h1>Reset Password</h1>
                <input id="email" type="text" placeholder="Email" />
                <br/>
                <button id="submit" onClick={sendResetEmail}>Reset</button>
            </div>
            <ToastContainer limit={1}/>
        </div>
    );
};

    export default Forgot_Password;
