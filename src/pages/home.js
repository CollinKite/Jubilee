import React from 'react';
import './home.css'

import arrow from '../images/arrow.png'
import remove from '../images/delete.png'

var taskCounter
loadTaskCounter()
var currentGroup = "Home"
var taskContainer = []

const Home = () => {
   
    return (
        <>
                <div className='container'>
                    {checkfortoken()}
                    <input type={"image"} src={require('../images/menu-icon.png')} className="menu" onClick={() => menuVisiblity("sidebar")}/>

                    <div className='sidebar' id='sidebar'>
                        <div id='sidebar'>
                        <ul className='options'>
                            <br/>
                            <li><a href="#" onClick={logout}>Logout</a></li>
                        </ul>
                        <ul className='groups' id ="groups">
                            <br/>
                            <li><div className='groupLink'>Home</div></li>
                        </ul>
                        </div>
                        <input type={"text"} placeholder="Enter New Group" className='groupEdit' id='newGroup' onKeyPress={createGroup}/>
                    </div> 
                    <div className='lists'>
                        <div className='headerContainer' id='headerContainer'>
                        <div className='title' id = 'title'>Home</div>
                        <input type={'image'} src={remove} className="deleteGroup" id="deleteGroup" onClick={() => deleteGroup()}/>
                        </div>
                        <ul id = "listHolder" onLoad={() => {GetTasks(currentGroup)}}>
                            <li></li>
                        </ul>
                    </div>
                    <div id="infobar"> </div> 
                </div>
        </>
    );

}

function checkfortoken()
{
    var token = localStorage.getItem("token");

    if(token === null){
        window.location.href = "/login"
    }
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

async function loadTaskCounter() {
    await findUser().then(response => taskCounter = response.result.taskCounter)

}

async function saveTaskCounter() {
    var userId = loadToken()

    const reponse = await fetch(`http://localhost:8080/users/${userId[1]}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, value: taskCounter, key: "taskCounter"}),
      });

}

async function saveTaskGroups() {
    var userId = loadToken()

    const reponse = await fetch(`http://localhost:8080/users/${userId[1]}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: userId, value: taskContainer, key: "taskGroups"}),
      });

}

async function createGroup(event) {

    if(event.key === "Enter"){

    var newGroup = await document.getElementById("newGroup").value
    currentGroup = await newGroup
    if(newGroup != ""){
        document.getElementById("newGroup").value = ""
    loadGroups(currentGroup)
    GetTasks(currentGroup)
    }
    
    
    }
}

async function deleteGroup(){
    var groups
    var filtered = []
    await findUser().then(response => groups = response.result.taskGroups)

    groups.forEach(element => {
        if(element != currentGroup){
            filtered.push(element)
        }
    });

    var token = loadToken()

    const reponse = await fetch(`http://localhost:8080/users/${token[1]}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({key: "taskGroups", value: filtered}),
    });

    document.getElementById("infobar").classList.toggle('hidden')

    currentGroup = "Home"
    
    loadGroups()
    GetTasks(currentGroup)

}

loadGroups()
async function loadGroups(value) {
    await findUser().then(response => taskContainer = response.result.taskGroups)

    if(value != undefined){
        taskContainer.push(value)
    }

   let groups = document.getElementById("groups")
   groups.innerHTML = `<br/>
   <li><div class='groupLink' id='home'>Home</div></li>`

   taskContainer.forEach(element => {
    groups.innerHTML += `<br/>
    <li><div class='groupLink'>${element}</div></li>`
   });
 
   let elements = document.querySelectorAll('.groupLink');

   for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener('click', function() {currentSetter(elements[i].innerHTML)})
   }

saveTaskGroups()
GetTasks(currentGroup)
}

async function loadHeader() {
    let header = document.getElementById("headerContainer")
    header.innerHTML = `<div class='title' id = 'title'>${currentGroup}</div>`

   if(currentGroup != "Home"){
    header.innerHTML += `<input type='image' src="${remove}" class="deleteGroup" id="deleteGroup"/>`
    document.getElementById("deleteGroup").addEventListener('click', function(){deleteGroup()})
   }
}

function currentSetter(value) {
    currentGroup = value
    GetTasks(currentGroup)
}

//somehow broke this
async function logout()
{
    await saveTaskCounter()
    await saveTaskGroups()

    localStorage.removeItem('token');
    window.location.href = '/login'
    
    return false
    
}

function menuVisiblity(id) {

    var menu = document.getElementById(id)
    menu.classList.toggle("hidden")
}

function infoBar(item) {
    let task = item
    var completion
    if(task.completed == true){
        completion = "Completed"
    }
    else{
        completion = "In Progress"
    }

    var info = document.getElementById("infobar")
    info.classList.remove("hidden")
    info.classList.add("infobar")
    info.innerHTML = `<div class="header"> \
    <input type="image" src="${arrow}" class="infoMenu" id="exit"/> \
    <div class="createDate">Created: ${task.createDate}</div> \
    <input type="image" src="${remove}" class="infoDelete" id="trash"/> \
    </div> \
        <ul> \
        <li><div id = "taskStatus" class="taskStatus">${completion}</li> \
        <li><input type="text" class="name" id="name"/></li> \
        <li><input type="text" class="name" id="date" placeholder="Enter Due Date"/></li> \
        <li><textarea class="description" placeholder="Enter task Description" id="desc">${task.taskDescription}</textarea></li> \
        <li><button class = "submitButton" id="submitButton">${completion}</button></li> \
        </ul>`

    document.getElementById("exit").addEventListener("click", function() {menuVisiblity("infobar")}, false)
    document.getElementById("trash").addEventListener("click", function() {deleteTask(task.taskId)}, false)
    document.getElementById("name").setAttribute("value", task.taskName)
    document.getElementById("date").setAttribute("value", task.dueDate)
    document.getElementById('name').addEventListener('keypress', function(event) {updateInfo(event.key, task, "name")})
    document.getElementById('date').addEventListener('keypress', function(event) {updateInfo(event.key, task, "date")})
    document.getElementById('desc').addEventListener('keypress', function(event) {updateInfo(event.key, task, "desc")})
    document.getElementById("submitButton").addEventListener("click", function() {updateInfo("Enter", task, "completion")})

    document.getElementById('name').addEventListener('blur', function() {updateInfo("Enter", task, "name")})
    document.getElementById('date').addEventListener('blur', function() {updateInfo("Enter", task, "date")})
    document.getElementById('desc').addEventListener('blur', function() {updateInfo("Enter", task, "desc")})
    
}

async function updateInfo(e, task, id){
    if(e === "Enter"){
    var task = task
    var updatedTask

    switch(id){
    case "name":
        var name = document.getElementById("name").value
        updatedTask = {
        taskId: task.taskId,
        taskName: name,
        taskDescription: task.taskDescription,
        taskType: task.taskType,
        createDate: task.createDate,
        dueDate: task.dueDate,
        completed: task.completed
        }
        await updateTask(updatedTask);
        document.getElementById(`${task.taskId}name`).innerHTML = name;
        break;
    case "date":
        var date = document.getElementById("date").value
        updatedTask = {
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskType: task.taskType,
        createDate: task.createDate,
        dueDate: date,
        completed: task.completed
        }
        await updateTask(updatedTask);
        break;
    case "desc":
        var desc = document.getElementById("desc").value
        updatedTask = {
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: desc,
        taskType: task.taskType,
        createDate: task.createDate,
        dueDate: task.dueDate,
        completed: task.completed
        }
        await updateTask(updatedTask);
        
        break;
    case "completion":
        var updated
        if(task.completed == true){
            updated = false
        }else{
            updated = true
        }
        
        updatedTask = {
            taskId: task.taskId,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            taskType: task.taskType,
            createDate: task.createDate,
            dueDate: task.dueDate,
            completed: updated
            }
            await updateTask(updatedTask);
            
           
        
            break;
}
infoBar(updatedTask)
GetTasks(currentGroup);
}

}

GetTasks("Home")
async function GetTasks(group) {
    loadHeader()

    var group = group
    var tasks
    var filtered
    await findUser().then(response => tasks = response.result.tasks)
    filtered = tasks

    if(group != "Home"){
        filtered = []
        for(let i = 0; i< tasks.length; i++){
            if(tasks[i].taskType == group){
                filtered.push(tasks[i])
            }
        }
    }
  
    let container = document.getElementById("listHolder")
    container.innerHTML = `<li>
    <div class='submitBox'>
        <input type="text" placeholder="Enter New Task" class='newTask' id ='newTask'/>
        <button class='submit' id="sbmtbtn">Add</button>
    </div>
    <br/>
    </li>`
    
    filtered.forEach(element => {
        container.innerHTML +=`<li class='li' >
    <div class='info' id='${element.taskId}Info' >
        <div class='taskName' id='${element.taskId}name'>
            ${element.taskName}
        </div>
    </div>
    </li>
    <br/>` 

    });

    document.getElementById("sbmtbtn").addEventListener("click", function(){createTask()}, false)
    let elements = document.querySelectorAll('.info');

    document.getElementById("title").innerHTML = currentGroup
    

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

async function updateTask(task){

    var token = loadToken()

    const reponse = await fetch('http://localhost:8080/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token[1]}`
      },
      body: JSON.stringify(task),
    });
}

async function deleteTask(id) {
    var token = loadToken()

    const reponse = await fetch('http://localhost:8080/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token[1]}`
      },
      body: JSON.stringify({taskId: id}),
    });

    document.getElementById("infobar").classList.add('hidden')

    GetTasks(currentGroup)

}

async function createTask() {
    var token = loadToken()
    var name = document.getElementById('newTask').value
    if(name != ""){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    var task = {
        taskId: taskCounter,
        taskName: name,
        taskDescription: "",
        taskType: currentGroup,
        createDate: today,
        dueDate: "",
        completed: false
    }

    const reponse = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token[1]}`
      },
      body: JSON.stringify(task),
    });

    taskCounter ++;
    console.log(taskCounter)
    await saveTaskCounter()
    GetTasks(currentGroup)
}
}

export default Home;