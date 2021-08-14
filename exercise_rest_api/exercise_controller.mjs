import * as exercises from './exercise_model.mjs';
import express, { urlencoded } from 'express';
const app = express();

const PORT = 3000;


//allows us to handle json objects with our requests an responses
app.use(express.json());
/**
 * Create a new Exercise with the name, reps, weight, unit, and date provided in the request body parameters
 */
app.post("/exercises", (req, res) => {
    console.log(req.body);
{
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: 'Request failed ' });
        });
    }

});

/**
 * Retrive all Exercises
 */
app.get("/exercises", (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: `Request failed ${error}` });
        });

});
/**
 * retrieve the exercise whose _id is provided in the path parameters
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(500).json({ error: `Request failed ${error}` });
        });

});


/**
 * Update the Exercise whose _id is provided and set its name, reps, weight, unit and date
 */
app.put("/exercises/:_id", (req, res) => {
    console.log(req.query);
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(updateCount => {
            if (updateCount === 1){
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit,  date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
            console.log(updateCount);
        
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: `Request failed ${error}` });
        });
});

/**
 * Delete the exercise whose _id is provided in the path parameters
 */
app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1){
                res.status(204).send()
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
      
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: `Request failed ${error}` });
        });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});