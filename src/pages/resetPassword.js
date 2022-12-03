import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'




const Reset_Password = () => {
    return (
        <div id="resetPasswordpage">
            <Logo/>
            <div id="card">
                <a href='/' id='back'><img src={back} alt="back icon"></img></a>
                <h1>Reset Password</h1>
                <input id="password" type="text" placeholder="Password" />
                <br/>
                <input id="confirm_password" type="text" placeholder="Confirm Password" />
                <br/>
                <button id="submit">Reset</button>
            </div>
        </div>
    );
};

    export default Reset_Password;