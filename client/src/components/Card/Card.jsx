import { Link } from "react-router-dom"
import './Card.css';

export default function Card({task}) {
    return(
        <>
        <Link to={`/tasks/${task.id}`} className="card">
            <div className="task-info"><span id='task-id'>{task.id}</span>{task.title}</div>
            <div className="task-info"><span>priority :</span> {task.priority}</div>
            <div className="task-info"><span>status :</span> {task.status}</div>
            <div className="task-info"><span>duedate :</span> {task.dueDate}</div>   
        </Link>
        </>
    )
};