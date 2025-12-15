import { useEffect, useState } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import axios from "axios"
import Navbar from "../../components/navbar/Navbar"
import "./TaskDetail.css"


export default function TaskDetail() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [task , setTask] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3000/tasks/select/${id}`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then((res) =>{setTask(res.data)})
        .catch((err) =>{console.log("error fetching :" , err)})
    },[id]);

    async function removeTask() {
        await axios.delete(`http://localhost:3000/tasks/remove/${id}`, {
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .catch((err)=> {console.log("error removing",err)});

        navigate("/tasks");

    };

    return (
        <>
        <Navbar />
        <div className="task-container">
            <div className="task-details">
                <div className="task-info"><span id='task-id'>{task.id}</span>{task.title}</div>
                <div className="task-info"><span>description :</span> {task.description}</div>
                <div className="task-info"><span>priority :</span> {task.priority}</div>
                <div className="task-info"><span>status :</span> {task.status}</div>
                <div className="task-info"><span>duedate :</span> {task.dueDate}</div>
                <div className="task-info"><span>created at :</span> {task.createdAt}</div>
                <div className="task-info"><span>updated at :</span> {task.updatedAt}</div>
            </div>
            <div className="task-action-buttons">
                <button 
                    style={{backgroundColor: "blue"}}
                    onClick={()=> navigate(`/tasks/${id}/update`)} 
                > edit task information </button>
                    
                
                <button
                    style={{backgroundColor: "red"}}
                    onClick={()=> removeTask()}
                > remove task</button>
            </div>
        </div>
        
        </>
    )
};




