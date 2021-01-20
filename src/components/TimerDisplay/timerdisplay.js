import React from 'react'

const TimerDisplay = () => {
  return(
    <div className="timer">
      <div className="timer__display">
        <span className="display__time">17:59</span>
        <span className="display__pause-label">PAUSE</span>
      </div>
    </div>
  )
}

export default TimerDisplay