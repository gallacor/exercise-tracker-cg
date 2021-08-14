import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    //sends a delete request to the server to delete an exercise by its _id, updates the UI if request is complete or logs the error in the console otherwise
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
        history.push('/')
    };

    //sets the exercise to edit and pulls up controls to edit the exercise via the edit-exercise URL
    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }
    //loads all data in the db on the homepage database
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    //when the database is changed then exercises are reloaded on the homepage
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;