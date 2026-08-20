import React from 'react'

const Dashboard = ({ workouts, onViewWorkouts, onCreateWorkout }) => {
  const totalWorkouts = workouts.length
  const totalExercises = workouts.reduce((sum, workout) => sum + workout.exercises.length, 0)
  const avgWorkoutDuration = workouts.length > 0
    ? Math.round(
        workouts.reduce((sum, workout) => {
          return sum + workout.exercises.reduce((exSum, ex) => exSum + ex.duration, 0)
        }, 0) / workouts.length / 60
      )
    : 0

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Welcome to Your Fitness Playlist Generator</h2>
        <p>Sync your workout routines with the perfect music playlist</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-value">{totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏃</div>
          <div className="stat-value">{totalExercises}</div>
          <div className="stat-label">Total Exercises</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{avgWorkoutDuration} min</div>
          <div className="stat-label">Avg Duration</div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={onCreateWorkout}>
            <span className="btn-icon">➕</span>
            Create New Workout
          </button>
          <button className="action-btn secondary" onClick={onViewWorkouts}>
            <span className="btn-icon">📋</span>
            View My Workouts
          </button>
        </div>
      </div>

      <div className="recent-workouts">
        <h3>Recent Workouts</h3>
        {workouts.slice(0, 3).map(workout => (
          <div key={workout.id} className="workout-preview">
            <div className="workout-preview-header">
              <h4>{workout.name}</h4>
              <span className="exercise-count">{workout.exercises.length} exercises</span>
            </div>
            <div className="workout-preview-details">
              {workout.exercises.map((ex, idx) => (
                <span key={ex.id} className="exercise-tag">
                  {ex.name} ({ex.bpm} BPM)
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
