import React from 'react';
import Logo from '../components/logo';
import back from '../icons/arrow_back_48dp.svg'




const Reset = () => {
    return (
        <div id="resetpage">
            <Logo/>
            <div id="card">
                <a href='/' id='back'><img src={back} alt="back icon"></img></a>
                <h1>Reset Password</h1>
                <input id="email" type="text" placeholder="Email" />
                <br/>
                <button id="submit">Reset</button>
            </div>
        </div>
    );
};

    export default Reset;