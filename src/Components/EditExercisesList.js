import { useEffect, useState } from "react";
import Datepicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditExerciseList = (props) => {
    const {id} = useParams()
    const [exercise, setExercise] = useState({})
    const [users, setUsers] = useState([])
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5000/"
    })

    useEffect(() =>{
        axiosInstance.get("exercises/" + id)
            .then(res => {
                setExercise(res.data)
            })
            .catch(err => console.log('Error' + err))

        axiosInstance.get("/users")
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log("Error" + err))
    },[])

    const onDescriptionChange = (e) =>{
        setExercise(prevExercise => ({...prevExercise, description: e.target.value}))
    }

    const onDurationChange = (e) =>{
        setExercise(prevExercise => ({...prevExercise, duration: e.target.value}))
    }

    const onDateChange = (newDate) =>{
        setExercise(prevExercise=> ({...prevExercise, date: newDate}))
    }

    const onUsernameChange = (e) =>{
        setExercise(prevExercise => ({...prevExercise,username: e.target.value} ))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(exercise)
        axiosInstance.post("exercises/update/" + id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error " + err))
        window.location = "/"
    }

    return (
        <div>
            <h1>Edit Exercise</h1>
            <form action="post">
                <div  className="addExercise">
                    <div className="flex-col">
                        <label htmlFor="username">Username</label>  
                        <select id="username" className="username_add" type="text" onChange={onUsernameChange}>
                            {users.map(user => <option value={user?.username}>{user?.username}</option>)}
                        </select> 
                    </div>
                    <div className="flex-col">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" onChange={onDescriptionChange} value={exercise?.description} />
                    </div>
                    <div className="flex-col">
                        <label htmlFor="duration">Duration</label>  
                        <input id="duration" type="text" onChange={onDurationChange} value={exercise?.duration} />
                    </div>
                    <div className="flex-col">
                        <label htmlFor="date">Date</label>  
                        {exercise?.date && <Datepicker selected={new Date(exercise.date)} onChange={onDateChange} />}                    </div>
                </div>
                <button class = "custom_button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
 
export default EditExerciseList;