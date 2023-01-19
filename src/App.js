import React from "react"
import Navbar from "./Components/Navbar"
import {Routes, Route} from "react-router-dom"
import ExercisesList from "./Components/ExercisesList"
import EditExercisesList from "./Components/EditExercisesList";
import CreateUsers from "./Components/CreateUsers";
import AddExercises from "./Components/AddExercises";
import EditExerciseList from "./Components/EditExercisesList";

export default function App() {
  return (
    <>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element = {<ExercisesList />} />
        <Route path="/edit" element = {<EditExercisesList />} />
        <Route path="/add" element = {<AddExercises/>} />
        <Route path="/create" element = {<CreateUsers />} />
        <Route path= "/exercises/:id" element = {<EditExerciseList/>} />
      </Routes>
    </div>
    </>
  );
}

