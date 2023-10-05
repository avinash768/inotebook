import React, { useEffect } from 'react';
import {
    Link ,useLocation
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from './User';



const Nevbar = () => {
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <User />
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        <Link className="btn btn-primary  mx-2" to="/login" href="#" role="button">Login</Link>
                        <Link className="btn btn-primary  mx-2" to="/singup" href="#" role="button">Sing up</Link>
                    </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Nevbar
