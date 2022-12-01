import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import './home.css'
import { BarLoader } from 'react-spinners';
import { getActiveElement } from '@testing-library/user-event/dist/utils';

import arrow from '../images/arrow.png'
import remove from '../images/delete.png'

const Home = () => {
   
    return (
        <>
                <div className='container'>
                    <input type={"image"} src={require('../images/menu-icon.png')} className="menu" onClick={() => menuVisiblity("sidebar")}/>

                    <div className='sidebar' id='sidebar'>
                        <ul className='options'>
                            <br/>
                            <li><a href="/home" onClick={logout}>Logout</a></li>
                        </ul>
                        <ul className='groups'>
                            <br/>
                            <li><div className='groupLink'>Home</div></li>
                        </ul>
                        <input type={"text"} placeholder="Enter New Group" className='groupEdit'/>
                    </div> 
                    <div className='lists'>
                        <ul id = "listHolder" onLoad={GetTasks}>
                            <li></li>
                        </ul>
                    </div>
                    <div className='infobar' id="infobar"> </div> 
                </div>
        </>
    );

}

//this code can be replaced with better token authorization
function loadToken()
{
    var token = localStorage.getItem("token");

    if(token !== null){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    let obj = JSON.parse(jsonPayload)
    let info = [obj.email, obj.userId]


    return(info)
}
}

//somehow broke this
function logout()
{
    localStorage.removeItem('token');
    window.location.replace = "/login";
}

function menuVisiblity(id) {

    var menu = document.getElementById(id)
    menu.classList.toggle("hidden")
}

function infoBar(item) {

    let task = item

    var info = document.getElementById("infobar")
    info.classList.remove("hidden")
    info.innerHTML = `<div class="header"> \
    <input type="image" src="${arrow}" class="infoMenu" id="exit"/> \
    <div class="createDate">Created: ${task.createDate}</div> \
    <input type="image" src="${remove}" class="infoDelete" id="trash"/> \
    </div> \
        <ul> \
        <li><input type="text" class="name" id="name"/></li> \
        <li><input type="text" class="name" id="date" placeholder="Enter Due Date"/></li> \
        <li><textarea class="description" placeholder="Enter task Description" value = "what">${task.taskDescription}</textarea></li> \
        </ul>`

    document.getElementById("exit").addEventListener("click", function() {menuVisiblity("infobar")}, false)
    document.getElementById("trash").addEventListener("click", function() {menuVisiblity("infobar")}, false)
    document.getElementById("name").setAttribute("value", task.taskName)
    document.getElementById("date").setAttribute("value", task.dueDate)
    
}

function saveTask() {
    console.log('stuff')
}

GetTasks()
async function GetTasks() {

    var tasks
    await findUser().then(response => tasks = response.result.tasks)
  
    let container = document.getElementById("listHolder")

    container.innerHTML = `<li>
    <div className='submitBox'>
        <input type="text" placeholder="Enter New Task" class='newTask'/>
        <button class='submit' id="sbmtbtn">Add</button>
    </div>
    <br/>
    </li>`
    
    tasks.forEach(element => {
        container.innerHTML +=`<li class='li' >
    <div class='info' id='${element.taskId}Info' >
        <div class='taskName'>
            ${element.taskName}
        </div>
    </div>
    </li>
    <br/>` 

    });

    document.getElementById("sbmtbtn").addEventListener("click", function(){saveTask()}, false)
    let elements = document.querySelectorAll('.info');

   for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener('click', function() {infoBar(tasks[i])})
   }
}

async function findUser() {
    let info = loadToken();

    return fetch(`http://localhost:8080/users/${info[0]}`)
    .then((response) => response.json())
    .then((data) => {
        
        return data
    })
    .catch(error => console.log(error))
}

export default Home;