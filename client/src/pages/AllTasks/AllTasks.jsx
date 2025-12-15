import { useEffect,useState } from "react"
import axios from "axios"
import Card from "../../components/Card/Card"
import Filters from "../../components/Filters/Filters"
import Navbar from "../../components/navbar/Navbar"
import './AllTasks.css'

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/tasks/all" , {
            headers : {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => setTasks(res.data))
        .catch(err => console.log("error fetching :" , err)) 
    },[]);

    function priorityFilter(filter) {
        axios.post("http://localhost:3000/tasks/priorityFilter" ,
            {
                priority: filter
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        )
        .then(res => setTasks(res.data))
        .catch(err => console.log("error fetching",err))
    };

    function statusFilter(filter) {
        axios.post("http://localhost:3000/tasks/statusFilter",
            {
                status : filter
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        )
        .then(res => setTasks(res.data))
        .catch(err => console.log("fetching",err))
    };

    function duedateFilter(filter) {
        axios.post("http://localhost:3000/tasks/DateFilter",
            {
                order : filter
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        )
        .then(res => setTasks(res.data))
        .catch(err => console.log("fetching",err))
    }; 



    return (
        <>
        <Navbar />
        <div className="alltasks-page">
            <div className="tasks-searchBar">
                {/* <div className="searchBar">
                    <input type="text" />
                    <button>search</button>
                </div> */}
                <div className="tasks-container">
                    {tasks.map((task)=>(
                        <Card key={task.id} task={task}/> 
                    ))}
                </div>    
            </div>
            <div className="filters-container">
                <Filters priority={priorityFilter} status={statusFilter} duedate={duedateFilter} />
            </div>
        </div>
        
        </>
    )
};


 