import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const TimerDisplay = ({ timerMode,
                        percentage,
                        timeLeft,
                        isActive,
                        setIsActive,
                        buttonText,
                        setButtonText
                      }) => {

  const handleClick = (event) => {
    setIsActive(!isActive)
    setButtonText( event.target.innerText === 'START'
                    || event.target.innerText === 'RESUME'
                      ? 'PAUSE'
                      : 'RESUME'
                  )
  }

  let timesUpMsg = timerMode === 'pomo'
                  ? 'time for a break'
                  : 'back to work!'

  let timeText = timeLeft === '0:00'
                  ? timesUpMsg
                  : timeLeft

  let textSize = timeLeft === '0:00'
                  ? '12px'
                  : '28px'

  return(
    <div className="timer">
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={4}
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: 'var(--accent-color)',
            textColor: 'var(--text)',
            textSize: textSize,
            fontFamily: 'var(--font-current)',
            trailColor: 'none',
          })}>
          
          <button className="display__start-pause" onClick={handleClick}>{buttonText}</button>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}

export default TimerDisplay