import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import './home.css'
import { BarLoader } from 'react-spinners';
import { getActiveElement } from '@testing-library/user-event/dist/utils';

import arrow from '../images/arrow.png'
import remove from '../images/delete.png'

//this code can be replaced with better token authorization
function loadToken()
{
    var token = localStorage.getItem("token");
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    let obj = JSON.parse(jsonPayload)
    let info = [obj.email, obj.userId]

    return(info)
}

loadToken()

//somehow broke this
function logout()
{
    localStorage.removeItem('token');
    window.location.replace = "/login";
}


const Home = () => {
    const [loading, setLoading] = useState(true)

    //just an example I was using for testing
    let task = {
        taskId: 1,
        taskName: "Task 1",
        taskDescription: "Stuff",
        taskType: "Personal",
        createDate: "2020-10-10",
        dueDate: "2020-10-10",
        completed: false
    }

    function menuVisiblity(id) {

        var menu = document.getElementById(id)
        menu.classList.toggle("hidden")
    }

    function infoBar() {

        var info = document.getElementById("infobar")
        info.classList.remove("hidden")
        info.innerHTML = `<div class="header"> \
        <input type="image" src="${arrow}" class="infoMenu" id="exit"/> \
        <div class="createDate">Created: ${task.createDate}</div> \
        <input type="image" src="${remove}" class="infoDelete" id="trash"/> \
        </div> \
            <ul> \
            <li><input type="text" class="name" id="name"/></li> \
            <li><input type="text" class="name" placeholder="Enter Due Date"/></li> \
            <li><textarea class="description" placeholder="Enter task Description"></textarea></li> \
            </ul>`

        var exit = document.getElementById("exit")
        exit.addEventListener("click", function() {menuVisiblity("infobar")}, false)
        var trash = document.getElementById("trash")
        trash.addEventListener("click", function() {menuVisiblity("infobar")}, false)
        var name = document.getElementById("name")
        name.setAttribute("value", task.taskName)
        
    }

    

    // useEffect(() => {
    //   setTimeout(() => setLoading(false), 10000)
    // }, [])

    
    document.onreadystatechange = function () {
        console.log(this.readyState)
          if (document.readyState === "complete") {
            console.log("page fully loaded")
            setLoading(false)
          }
        }
    return (
        <>
            {loading === false ? (

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
                        <ul id = "listHolder" >
                            <li>
                                <div className='submitBox'>
                                    <input type={"text"} placeholder="Enter New Task" className='newTask'/>
                                    <button className='submit'>Add</button>
                                </div>
                                <br/>
                            </li>
                            {/* <li className='li' >
                                <div className='info' id={task.taskId + "I"} onClick={() => infoBar("sidebar")}>
                                    <div className='taskName'>
                                        {task.taskName}
                                    </div>
                                </div>
                            </li>
                            <br/>
                            <li className='li'>
                                <div className='info' id={task.taskId + "I"}>
                                    <div className='taskName'>
                                        {task.taskName}
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    
                    <div className='infobar' id="infobar">
                        <div className='header'>
                        <input type={"image"} src={require('../images/arrow.png')} className="infoMenu" onClick={() => menuVisiblity('infobar')}/>
                        <div className="createDate">Created: {task.createDate}</div>
                        <input type={"image"} src={require('../images/delete.png')} className="infoDelete" onClick={() => menuVisiblity('infobar')}/>
                        </div>
                            <ul>
                            <li><input type={"text"} className="name" defaultValue={task.taskName}/></li>
                            <li><input type={"text"} className="name" placeholder='Enter Due Date'/></li>
                            <li><textarea className='description' placeholder='Enter task Description'/></li>
                            <li>{task.completed}</li>
                            </ul>
                    </div> 
                </div>

                ) : (
                    <BarLoader color="#36d7b7" />
                )
            }
        </>
    );

}


// GetTasks();
// async function GetTasks() {
  
// let container = document.getElementById("listHolder")
// container.innerHTML=`<li className='li' >
// <div className='info' id={task.taskId + "I"} onClick={() => infoBar("sidebar")}>
//     <div className='taskName'>
//         {task.taskName}
//     </div>
// </div>
// </li>` 

// }

export default Home;

findUser()

async function findUser() {
    //Was having and issue connecting to api earlier so I was testing things with this
    let info = loadToken();
    const res = await fetch('http://localhost:8080/users/test@email.com')
    const data = await res.json()
    console.log(data)
    return fetch(`http://localhost:8000/users/${info[0]}`)
}