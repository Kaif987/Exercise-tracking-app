import { useState } from "react";
import axios from "axios";

const CreateUsers = (props) => {
    const [username, setUsername] = useState("")

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
    });
      
    function onUsernameChange(e){
        setUsername(e.target.value)
    }

    function onUsernameSubmit(e){
        e.preventDefault()
        axiosInstance.post("/users/add", {username})
            .then(res => console.log(res.data))
            .catch(err => console.log("Error" + err))
        setUsername("")
    }


    return ( 
        <form className="createUser">
            <div>
                <h1>Create New User</h1>
                <label htmlFor="username">Username</label>
                <input id= "username" value={username} onChange = {onUsernameChange} />
            </div>
            <button className="custom_button" onClick={onUsernameSubmit}>Submit</button>
        </form>
     );
}
 
export default CreateUsers;