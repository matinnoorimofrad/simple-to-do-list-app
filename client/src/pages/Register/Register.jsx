import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import'./Register.css'

export default function Register() {
    
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmedPass , setConfirmedPass] = useState("");
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                username,
                email,
                password,
                confirmedPass
            });
            console.log(response.data);
            navigate('/login');
        } catch(error) {
            console.log(error.message);
        }
    };
    
    return (
        <>
        <form onSubmit={handleSubmit} className="register-box">
            <label>username</label>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} />
            <label>email</label>
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <label>password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <label>confirm password</label>
            <input type="password" value={confirmedPass} onChange={(e)=> setConfirmedPass(e.target.value)}/>
            <button type='submit'>REGISTER</button>
        </form>
        </>
    )
};