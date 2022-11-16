import React from 'react';
import back from '../icons/arrow_back_48dp.svg'
import logo from '../images/logo512.png'



const Reset = () => {
    return (
        <div id="resetpage">
            <a href='/' id='logo'><img src={logo} alt="logo"></img></a>
            <a href='/'><h2 id='logo'>Jubilee</h2></a>
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