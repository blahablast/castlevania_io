import { useEffect, useState } from 'react'
import AudioPlayer from '../audio-player'
import styles from './day-night.module.css'

export default function DayNight() {
  const [isNight, setIsNight] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalText, setModalText] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight((prevIsNight) => {
        const nextIsNight = !prevIsNight
        setModalText(
          nextIsNight
            ? 'What a horrible night to have a curse!'
            : 'The morning sun has vanquished the horrible night'
        )
        setShowModal(true) // Show modal right after changing the night/day state
        return nextIsNight
      })
    }, 7000) // Adjusted timing for testing

    return () => clearInterval(interval) // Clean up the interval on unmount
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false) // Hide modal after 5 seconds
    }, 5000)

    return () => clearTimeout(timer) // Clean up the timeout on unmount
  }, [modalText]) // Run this effect whenever the modalText changes

  return (
    <div className={isNight ? styles.night : styles.day}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.backgroundVideo}
      >
        <source src="/video/sq_background.mp4" type="video/mp4" />
      </video>
      <AudioPlayer
        src={isNight ? '/music/sq_night.mp3' : '/music/sq_day.mp3'}
      />

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{modalText}</h2>
          </div>
        </div>
      )}
    </div>
  )
}
