import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const TimerDisplay = ({ percentage, timeLeft }) => {
  return(
    <div className="timer">
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeLeft}
          strokeWidth={4}
          styles={buildStyles({
            // Text size
            textSize: '28px',
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: 'var(--accent-color)',
            textColor: 'var(--text)',
            fontFamily: 'var(--font-current)',
            trailColor: 'none',
          })}>
          
          <span className="display__pause-label">PAUSE</span>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}

export default TimerDisplay