import { useEffect, useState } from "react";
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddExercises = (props) => {
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: null,
        date: null
    })

    const [users, setUsers] = useState([])

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
      });

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(exercise)
        axiosInstance.post("exercises/add", exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error " + err))
        window.location = "/"
    }

    const onUsernameChange = (e) =>{
        setExercise(prevExercise =>{
            return {
                ...prevExercise,
                username: e.target.value
            }
        })
    }

    const onDescriptionChange = (e) =>{
        setExercise(prevExercise =>{
            return {
                ...prevExercise,
                description: e.target.value
            }
        })
    }

    const onDurationChange = (e) =>{
        setExercise(prevExercise =>{
            return {
                ...prevExercise,
                duration: e.target.value
            }
        })
    }

    const onDateChange = (newDate) =>{
        setExercise(prevExercise=>{
            return {
                ...prevExercise,
                date: newDate
            }
        })
    }

    useEffect(() =>{
        axiosInstance.get("/users")
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log("Error" + err))
    }, [])

    return ( 
        <div>
            <h1>Add Exercises</h1>
            <form action="post">
                <div  className="addExercise">
                    <div className="flex-col">
                        <label htmlFor="username">Username</label>  
                        <select id="username" className="username_add" type="text" onChange={onUsernameChange}>
                            {users.map(user => <option value={user.username}>{user.username}</option>)}
                        </select> 
                    </div>
                    <div className="flex-col">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={onDescriptionChange} value={exercise.description} />
                    </div>
                    <div className="flex-col">
                        <label htmlFor="duration">Duration</label>  
                        <input id="duration" type="text" onChange={onDurationChange} value={exercise.duration} />
                    </div>
                    <div className="flex-col">
                        <label htmlFor="date">Date</label>  
                        <Datepicker selected={exercise.date} onChange={onDateChange} />
                    </div>
                </div>
              <button class = "custom_button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
     );
}
 
export default AddExercises;