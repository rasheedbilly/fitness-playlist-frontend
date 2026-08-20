import React, { useState } from 'react'

const WorkoutForm = ({ onSubmit }) => {
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([
    { name: '', duration: '', bpm: '', genre: 'Pop' }
  ])

  const genres = ['Pop', 'Rock', 'Jazz', 'R&B', 'Electronic', 'Hip Hop', 'Classical', 'Country']

  const addExercise = () => {
    setExercises([...exercises, { name: '', duration: '', bpm: '', genre: 'Pop' }])
  }

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index, field, value) => {
    const updated = exercises.map((ex, i) => {
      if (i === index) {
        return { ...ex, [field]: value }
      }
      return ex
    })
    setExercises(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!workoutName.trim()) {
      alert('Please enter a workout name')
      return
    }

    const validExercises = exercises.filter(ex =>
      ex.name.trim() && ex.duration && ex.bpm
    )

    if (validExercises.length === 0) {
      alert('Please add at least one complete exercise')
      return
    }

    const workout = {
      name: workoutName,
      exercises: validExercises.map(ex => ({
        name: ex.name,
        duration: parseInt(ex.duration) * 60, // Convert minutes to seconds
        bpm: parseInt(ex.bpm),
        genre: ex.genre
      }))
    }

    onSubmit(workout)

    // Reset form
    setWorkoutName('')
    setExercises([{ name: '', duration: '', bpm: '', genre: 'Pop' }])
  }

  return (
    <div className="workout-form-container">
      <div className="section-header">
        <h2>Create New Workout</h2>
        <p>Build your custom workout routine</p>
      </div>

      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-group">
          <label htmlFor="workout-name">Workout Name</label>
          <input
            id="workout-name"
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="e.g., Morning Cardio, Evening Stretch"
            className="form-input"
          />
        </div>

        <div className="exercises-section">
          <div className="exercises-header">
            <h3>Exercises</h3>
            <button type="button" onClick={addExercise} className="add-exercise-btn">
              ➕ Add Exercise
            </button>
          </div>

          {exercises.map((exercise, index) => (
            <div key={index} className="exercise-form-card">
              <div className="exercise-form-header">
                <h4>Exercise {index + 1}</h4>
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="exercise-form-grid">
                <div className="form-group">
                  <label>Exercise Name</label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    placeholder="e.g., Running, Jumping Jacks"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={exercise.duration}
                    onChange={(e) => updateExercise(index, 'duration', e.target.value)}
                    placeholder="5"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Target BPM</label>
                  <input
                    type="number"
                    min="60"
                    max="200"
                    value={exercise.bpm}
                    onChange={(e) => updateExercise(index, 'bpm', e.target.value)}
                    placeholder="120"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Genre</label>
                  <select
                    value={exercise.genre}
                    onChange={(e) => updateExercise(index, 'genre', e.target.value)}
                    className="form-select"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Workout
          </button>
        </div>
      </form>
    </div>
  )
}

export default WorkoutForm
