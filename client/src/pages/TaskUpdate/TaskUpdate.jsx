import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../../components/navbar/Navbar"
import "./TaskUpdate.css"

export default function TaskUpdate() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [task , setTask] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:3000/tasks/select/${id}` , {
            headers : {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => setTask(res.data))
        .catch(err => console.log('fetching error' , err))
    } , [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.patch("http://localhost:3000/tasks/edit",task,{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            navigate(`/tasks/${id}`);
        } catch(err) {
            console.log("error updating" , err);
        }
    };

    function handleChange (e) {
        setTask({...task , [e.target.name]: e.target.value})
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
            <label>duedate</label>
            <input name="duedate" type="text" value={task.dueDate} onChange={handleChange}/>
            <button type="submit">update</button>
        </form>
        </>
    )
}