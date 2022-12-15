
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditExercisePage({ itemToEdit }) {
  console.log(itemToEdit)

const history = useNavigate();

const [name, setName] = useState(itemToEdit.name);
const [reps, setReps] = useState(itemToEdit.reps);
const [weight, setWeight] = useState(itemToEdit.weight);
const [unit, setUnit] = useState(itemToEdit.unit);
const [date, setDate] = useState(itemToEdit.date);
const editExercise = async () => {
    // Build a new updatedExercise object out of the state variables that have
    // been submitted through the form below
    const updatedExercise = {name, reps, weight, unit, date};

    const response = await fetch(`/exercises/${itemToEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedExercise),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      alert("Exercise has been edited!");
    } else {
      alert(`Failed to edit movie, status code = ${response.status}`);
    }
    history.push('/');
  }

  return (
    <div>
      <h1>Edit a Exercise</h1>

        <fieldset>

          <label for="name">Exercise Name</label> 
          <input id="name"
            type="text"
            placeholder="deadlift"
            value={name}
            onChange={e => setName(e.target.value)}
          /> <br/>

          <label for="reps">Reps</label> 
          <input id="reps"
            type="number"
            min="0"
            placeholder="10"
            value={reps}
            onChange={e => setReps(e.target.value)}
          /> <br/>

          <label for="weight">Weight</label> 
          <input id="weight"
            type="number"
            min="0"
            placeholder="210"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          /> <br/>

          <label for="unit">Unit</label> 
          <input id="unit"
            type="text"
            placeholder="lbs/kgs"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          /> <br/>

          <label for="date">Date</label> 
          <input id="date"
            type="text"
            placeholder="08-13-2021"
            value={date}
            onChange={e => setDate(e.target.value)}
          /> <br/>

          <button onClick={editExercise}> Save </button>

        </fieldset>

    </div>
  )

};