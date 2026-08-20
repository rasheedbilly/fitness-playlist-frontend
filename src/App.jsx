import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import WorkoutList from './components/WorkoutList'
import WorkoutForm from './components/WorkoutForm'
import PlaylistView from './components/PlaylistView'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: 'Morning Warmup',
      exercises: [
        { id: 1, name: 'Walk', duration: 300, bpm: 120, genre: 'Jazz' },
        { id: 2, name: 'Arm Stretch', duration: 300, bpm: 90, genre: 'R&B' },
        { id: 3, name: 'Break', duration: 30, bpm: 90, genre: 'R&B' }
      ]
    },
    {
      id: 2,
      name: 'High Intensity Cardio',
      exercises: [
        { id: 4, name: 'Running', duration: 600, bpm: 150, genre: 'Electronic' },
        { id: 5, name: 'Jump Rope', duration: 300, bpm: 160, genre: 'Pop' }
      ]
    }
  ])
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [generatedPlaylist, setGeneratedPlaylist] = useState(null)

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      exercises: workout.exercises.map((ex, idx) => ({ ...ex, id: Date.now() + idx }))
    }
    setWorkouts([...workouts, newWorkout])
    setCurrentView('workouts')
  }

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id))
  }

  const generatePlaylist = (workout) => {
    // Mock playlist generation
    const totalDuration = workout.exercises.reduce((sum, ex) => sum + ex.duration, 0)
    const avgBpm = Math.round(
      workout.exercises.reduce((sum, ex) => sum + ex.bpm, 0) / workout.exercises.length
    )

    const mockSongs = [
      { title: 'Morning Vibes', artist: 'Jazz Collective', duration: 240, bpm: 120, genre: 'Jazz' },
      { title: 'Smooth Operator', artist: 'R&B Stars', duration: 210, bpm: 90, genre: 'R&B' },
      { title: 'Electric Dreams', artist: 'Synth Wave', duration: 195, bpm: 150, genre: 'Electronic' },
      { title: 'Pop Energy', artist: 'Dance Masters', duration: 180, bpm: 160, genre: 'Pop' },
      { title: 'Chill Beats', artist: 'Lo-Fi Hip Hop', duration: 200, bpm: 85, genre: 'Hip Hop' }
    ]

    // Select songs based on workout genres
    const workoutGenres = [...new Set(workout.exercises.map(ex => ex.genre))]
    const selectedSongs = mockSongs.filter(song =>
      workoutGenres.includes(song.genre)
    ).slice(0, 3)

    setGeneratedPlaylist({
      workoutName: workout.name,
      totalDuration,
      avgBpm,
      songs: selectedSongs
    })
    setCurrentView('playlist')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Fitness Playlist Generator</h1>
        <nav>
          <button
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={currentView === 'workouts' ? 'active' : ''}
            onClick={() => setCurrentView('workouts')}
          >
            My Workouts
          </button>
          <button
            className={currentView === 'new-workout' ? 'active' : ''}
            onClick={() => setCurrentView('new-workout')}
          >
            New Workout
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && (
          <Dashboard
            workouts={workouts}
            onViewWorkouts={() => setCurrentView('workouts')}
            onCreateWorkout={() => setCurrentView('new-workout')}
          />
        )}

        {currentView === 'workouts' && (
          <WorkoutList
            workouts={workouts}
            onSelectWorkout={setSelectedWorkout}
            onDeleteWorkout={deleteWorkout}
            onGeneratePlaylist={generatePlaylist}
          />
        )}

        {currentView === 'new-workout' && (
          <WorkoutForm onSubmit={addWorkout} />
        )}

        {currentView === 'playlist' && generatedPlaylist && (
          <PlaylistView
            playlist={generatedPlaylist}
            onBack={() => setCurrentView('workouts')}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built for fitness enthusiasts, by fitness enthusiasts</p>
      </footer>
    </div>
  )
}

export default App
