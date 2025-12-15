import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./AddNewTask.css"


export default function AddNewTask() {
    
    const navigate = useNavigate();
    const [task , setTask] = useState({});

    function handleChange(e) {
        setTask({...task , [e.target.name]: e.target.value})
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/tasks/add",task,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            navigate('/tasks');
        } catch(err) {
            console.log("fetching" , err)
        }
        
    };
    
    return (
        <>
        <Navbar />
        <form onSubmit={handleSubmit} className="update-box">
            <label>title</label>
            <input name="title" type="text" value={task.title} onChange={handleChange}/>
            <label>description</label>
            <textarea name="description" value={task.description} onChange={handleChange}/>
            <label>priority</label>
            <input name="priority" type="text" value={task.priority} onChange={handleChange}/>
            <label>status</label>
            <input name="status" type="text" value={task.status} onChange={handleChange}/>
            <label>dueDate</label>
            <input name="dueDate" type="date" value={task.dueDate} onChange={handleChange}/>
            <button type="submit">create</button>
        </form>
        </>
        )
};