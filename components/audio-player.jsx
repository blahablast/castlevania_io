import { useEffect, useState, useRef } from 'react'

export default function AudioPlayer({ src }) {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null) // Create a reference to the audio element

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src // Update the audio source
      audioRef.current.muted = isMuted // Ensure the audio starts muted
      audioRef.current.play().catch((error) => {
        console.error('Autoplay error:', error)
      })
    }
  }, [src]) // Re-run effect when src or mute state changes

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch((error) => {
        console.error('Playback error:', error)
      })
    }
  }, [isMuted])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className="p-2 bg-blue-300 text-white rounded-full shadow-lg hover:bg-pink-400 transition-colors duration-300"
      >
        {isMuted ? 'Play' : 'Stop'} Music
      </button>
      <audio id="background-music" loop playsInline ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
