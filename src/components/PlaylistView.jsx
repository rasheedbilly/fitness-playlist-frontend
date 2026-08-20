import React from 'react'

const PlaylistView = ({ playlist, onBack }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalPlaylistDuration = playlist.songs.reduce((sum, song) => sum + song.duration, 0)

  return (
    <div className="playlist-view">
      <button onClick={onBack} className="back-btn">
        ← Back to Workouts
      </button>

      <div className="playlist-header">
        <div className="playlist-icon">🎵</div>
        <h2>Generated Playlist</h2>
        <p className="workout-name">For: {playlist.workoutName}</p>
      </div>

      <div className="playlist-stats">
        <div className="playlist-stat-card">
          <span className="label">Workout Duration</span>
          <span className="value">{formatDuration(playlist.totalDuration)}</span>
        </div>
        <div className="playlist-stat-card">
          <span className="label">Average BPM</span>
          <span className="value">{playlist.avgBpm}</span>
        </div>
        <div className="playlist-stat-card">
          <span className="label">Total Songs</span>
          <span className="value">{playlist.songs.length}</span>
        </div>
        <div className="playlist-stat-card">
          <span className="label">Playlist Duration</span>
          <span className="value">{formatDuration(totalPlaylistDuration)}</span>
        </div>
      </div>

      <div className="songs-section">
        <h3>Your Workout Playlist</h3>
        <div className="songs-list">
          {playlist.songs.length === 0 ? (
            <div className="empty-playlist">
              <p>No songs found matching your workout criteria.</p>
              <p>Try adjusting your exercise genres or BPM settings.</p>
            </div>
          ) : (
            playlist.songs.map((song, index) => (
              <div key={index} className="song-card">
                <div className="song-number">{index + 1}</div>
                <div className="song-info">
                  <h4 className="song-title">{song.title}</h4>
                  <p className="song-artist">{song.artist}</p>
                </div>
                <div className="song-details">
                  <span className="badge genre-badge">{song.genre}</span>
                  <span className="badge bpm-badge">{song.bpm} BPM</span>
                  <span className="badge duration-badge">{formatDuration(song.duration)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="playlist-actions">
        <button className="action-button primary">
          🎧 Play on Spotify
        </button>
        <button className="action-button secondary">
          💾 Save Playlist
        </button>
        <button className="action-button secondary">
          📤 Share
        </button>
      </div>

      <div className="playlist-info">
        <p>
          This playlist has been automatically generated based on your workout's duration,
          tempo (BPM), and genre preferences. Songs are selected to match your exercise
          routine and play end-to-end without interruption.
        </p>
      </div>
    </div>
  )
}

export default PlaylistView
