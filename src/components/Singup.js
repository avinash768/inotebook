import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Singup = (props) => {
    const [creadentials, setcreadentials] = useState({name:"", email:" ", password:" " , cpassword:" "});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = creadentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email , password })
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //save thi auth token and redairet
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Successfully Sing up in ","success")
        }else{
            props.showAlert("Invalid credential","danger");
        }
    }
    const onChange = (e) => {
        setcreadentials({ ...creadentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onClick={onChange} aria-describedby="name" required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onClick={onChange} aria-describedby="emailHelp" required/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} onClick={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"minLength={5} onClick={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Singup
