import axios from "axios"
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"


const ExercisesList = (props) => {
    const [exercises, setExercise] = useState([])
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
      });

    const ExerciseRow = ({username, description, duration, date, id}) =>{
        return (
            <>
                <tr className="row">
                    <td><Link to= { `/exercises/${id}`}>{username}</Link></td>
                    <td>{description}</td>
                    <td>{duration}</td>
                    <td>{date.substring(0,10)}</td>
                    <td><button className="delete_btn" onClick={() => handleDelete(id)}>Delete</button></td>
                </tr>
            </>
        )
    }

    const handleDelete = (id) =>{
        setExercise(prevExercise => {
            return prevExercise.filter(exercise => exercise._id !== id)
        })
        axiosInstance.delete("/exercises/" + id)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error " + err))
    }
    
    useEffect(() =>{
        axiosInstance.get("/exercises")
        .then(res => {
            setExercise(res.data)
            console.log(res.data)
        })
        .catch(err => console.log("Error " + err) )  
    }, [])  
 
    return ( 
        <div>
            <h1>Exercises List</h1>
            <table className="exercise_table flex-col">
                <tr className= "row" >
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Delete</th>
                </tr>
                {exercises.map(exercise =>{
                    return <ExerciseRow username= {exercise.username}
                            description = {exercise.description}
                            duration = {exercise.duration}
                            date = {exercise.date}
                            id= {exercise._id}
                            key = {exercise._id}
                    />
                })}
            </table>
        </div>
     );
}
 
export default ExercisesList;