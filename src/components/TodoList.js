import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask';
import DarkNLogo from '../img/not-found-dark-logo.gif';
import LightNLogo from '../img/not-found-light-logo.gif';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [Nocon, setNoCon] = useState(false);
    
    console.log(window.matchMedia("prefers-color-scheme: dark").matches);

    const NoCon = () => {
        let arr = localStorage.getItem("taskList")
        if (arr === null) {
            setNoCon(true);
        } else if (arr.length === 2) {
            setNoCon(true);
        }
    }

    useEffect(() => {
        NoCon();
        let arr = localStorage.getItem("taskList")
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList);
        window.location.reload();
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload();
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        let arr = localStorage.getItem("taskList");
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
        if (arr === null) {
            window.location.reload();
        } else if (arr.length === 2) {
            window.location.reload();
        }
    }

    return (
        <>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
            <h3 className="title fixed-top text-center">Todo List</h3>
            <a href="#"><img src="https://i.ibb.co/XsFwQj4/homework.png" className="img fixed-top" width="70px" alt="logo" /></a>
            <div className = "header sticky-top text-center">
                <button className = "btn btn-primary mt-2 but" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = "task-container">
                {Nocon ? <div className="img-text"><img className="img-ns" src={LightNLogo} width="200px" height="200px" />
                <img className="img-ns-dark" src={DarkNLogo} width="200px" height="200px" />
                <center><h3 className="text-ns">Todo<br/>not found💔</h3></center>
                </div>: taskList&&taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
            <div className="bottom">
                <font size="2"><center>Copyright © 2022 <a href="" className="link">ToDo</a>. All right reserved.</center></font>
                <font size="2"><center>Developed by <a href="" className="link">JaNux</a> Inc</center></font>
            </div>
        </>
    );
};

export default TodoList;