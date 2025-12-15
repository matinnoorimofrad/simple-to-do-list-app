import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './login.css'

export default function Login() {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/users/login",{
                username,
                password,
            });
            console.log(response.data);
            localStorage.setItem("accessToken" , response.data.accessToken);
            navigate('/tasks');
            
        } catch(error) {
            console.log(error.message);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="login-box">
            <label>username or email</label>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} />
            <label>password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <button type='submit'>LOGIN</button>
        </form>
        </>
    )
};