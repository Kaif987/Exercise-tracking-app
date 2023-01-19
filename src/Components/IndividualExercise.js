import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualExercise = () => {
    const {id} = useParams()
    const [exercise, setExercise] = useState()
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000'
      });
    
    useEffect(() =>{
        axiosInstance.get("/exercises/" + id)
            .then(res =>{ 
                console.log(res.data)
                setExercise(res.data)
            })
            .catch(err => console.log("Error" + err))
    },[])

    return ( 
        <div>
            <h1>Exercise</h1>
            <h3>Username :{exercise?.username}</h3>
            <h3>Description: {exercise?.description}</h3>
            <h3>Duration: {exercise?.duration}</h3>
            <h3>Date: {exercise?.date.substring(0,10)}</h3>
        </div>
     );
}
 
export default IndividualExercise;