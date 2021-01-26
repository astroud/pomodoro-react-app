import React from 'react'

const Controls = ({ timerMode, setTimerMode }) => {

  const handleModeChange = (event) => {
    setTimerMode(event.target.id)
  }

  return(
    <form className="controls">
      <input  type="radio" 
              id="pomo" 
              name="mode" 
              checked={timerMode === 'pomo'} 
              onChange={handleModeChange} />
      <label  htmlFor="pomo" className="controls__button" >pomodoro</label>

      <input  type="radio" 
              id="short" 
              name="mode" 
              checked={timerMode === 'short'} 
              onChange={handleModeChange} />
      <label htmlFor="short"  className="controls__button">short break</label>
      
      <input  type="radio" 
              id="long" 
              name="mode" 
              checked={timerMode === 'long'} 
              onChange={handleModeChange} />
      <label htmlFor="long"  className="controls__button">long break</label>
    </form>
  )
}

export default Controls