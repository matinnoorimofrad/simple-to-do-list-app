import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import "./HomePage.css"

export default function HomePage() {
    return (
        <>
        <Navbar />
        <div className="homepage-container">
            <div className="homepage-notes">
                <div className="welcome">welcome to our small to-do-list app</div>
                <div className="guidance">if you have already created your profile please <Link to={"/login"} className="guidance-link">login</Link> to access your list</div>
                <div className="guidance">and if you don't have an account please <Link to={"/register"} className="guidance-link">register</Link> to use our app</div>
            </div>
        </div>
        
        </>
    )
};