import React from 'react'

const WorkoutList = ({ workouts, onSelectWorkout, onDeleteWorkout, onGeneratePlaylist }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalDuration = (exercises) => {
    return exercises.reduce((sum, ex) => sum + ex.duration, 0)
  }

  return (
    <div className="workout-list">
      <div className="section-header">
        <h2>My Workouts</h2>
        <p>Manage your workout routines and generate playlists</p>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No workouts yet</h3>
          <p>Create your first workout to get started!</p>
        </div>
      ) : (
        <div className="workouts-grid">
          {workouts.map(workout => {
            const totalDuration = getTotalDuration(workout.exercises)
            const avgBpm = Math.round(
              workout.exercises.reduce((sum, ex) => sum + ex.bpm, 0) / workout.exercises.length
            )

            return (
              <div key={workout.id} className="workout-card">
                <div className="workout-card-header">
                  <h3>{workout.name}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteWorkout(workout.id)}
                    title="Delete workout"
                  >
                    🗑️
                  </button>
                </div>

                <div className="workout-stats">
                  <div className="stat">
                    <span className="label">Duration:</span>
                    <span className="value">{formatDuration(totalDuration)}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Exercises:</span>
                    <span className="value">{workout.exercises.length}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Avg BPM:</span>
                    <span className="value">{avgBpm}</span>
                  </div>
                </div>

                <div className="exercises-list">
                  <h4>Exercises:</h4>
                  {workout.exercises.map(exercise => (
                    <div key={exercise.id} className="exercise-item">
                      <span className="exercise-name">{exercise.name}</span>
                      <div className="exercise-details">
                        <span className="badge">{formatDuration(exercise.duration)}</span>
                        <span className="badge">{exercise.bpm} BPM</span>
                        <span className="badge genre">{exercise.genre}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="generate-playlist-btn"
                  onClick={() => onGeneratePlaylist(workout)}
                >
                  🎵 Generate Playlist
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WorkoutList
