import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [creadentials, setcreadentials] = useState({ email: " ", password: "" });
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save thi auth token and redairet
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }else{
            alert("en"); 
        }

    }
    const onChange = (e) => {
        setcreadentials({ ...creadentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='contenar'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={creadentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={creadentials.password} onChange={onChange} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login