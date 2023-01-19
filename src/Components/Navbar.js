import React from "react"
import {Link} from "react-router-dom"

export default function Navbar(){
    return (
        <nav className="navbar">
            <ul>
                <li><Link to= "/" >Exercises List</Link></li>
                <li><Link to= "/add">Add Exercises</Link></li>
                <li><Link to= "/create">Create Users</Link></li>
            </ul>
        </nav>
    )
}