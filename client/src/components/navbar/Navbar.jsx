import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
    return (
        <>
        <div className="navbar">
            
            <Link to={"/tasks"} className="user-btn" > My tasks</Link>
            
            <div className="title">
                <h1>my tasks list</h1>
            </div>
            
            <Link to={"/addNewTask"} className="user-btn"> Add a new task</Link>
            
        </div>
        </>
    )
}














{/* <>
        <div className="navbar">
            <div className="user-side-btns">
                <Link to={"/tasks"} className="user-btn" > My tasks</Link>
                <Link to={"/addNewTask"} className="user-btn"> Add a new task</Link>
            </div>
            <div className="title">
                <h1>my tasks list</h1>
            </div>
            <div className="login-side-btns">
                <Link to={"/login"} className="auth-btn">Login</Link>
                <Link to={"/register"} className="auth-btn">Register</Link>
            </div>
        </div>
</> */}



