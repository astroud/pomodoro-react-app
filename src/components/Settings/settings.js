import React from 'react'
import Button from '../Button/button'

const Settings = ({ visible, toggleSettingsVisibility }) => {
  if (visible) {
    return (
      <div className="preferences preferences--visible">
      <div className="preferences__pane">
        <Button type="close" buttonText="×" toggleVisibility={toggleSettingsVisibility} />
        <h2>Settings</h2>
        <form>
          <div className="pane__time-settings">
            <h3>Time (Minutes)</h3>
            <div action="" className="time-settings__form">
              <label htmlFor="pomodoro">pomodoro</label>
              <input type="number" name="pomodoro" id="pomodoro" min="5" max="90" defaultValue="25" />
              <label htmlFor="short-break">short break</label>
              <input type="number" name="short-break" id="short-break" min="1" max="14" defaultValue="5" />
              <label htmlFor="long-break">long break</label>
              <input type="number" name="long-break" id="long-break" min="15" max="60" defaultValue="15" />
            </div>
          </div>

          <div className="pane__font-preference">
            <h3>Font</h3>
            <input type="radio" id="fontPref1" name="font" value="kumbh" />
            <label htmlFor="fontPref1" className="font-preference__kumbh">Aa</label>
            <input type="radio" id="fontPref2" name="font" value="roboto" />
            <label htmlFor="fontPref2" className="font-preference__roboto">Aa</label>
            <input type="radio" id="fontPref3" name="font" value="space" />
            <label htmlFor="fontPref3" className="font-preference__space">Aa</label>
          </div>

          <div className="pane__color-preference">
            <h3>Color</h3>
            <input type="radio" id="colorPref1" name="color" value="" />
            <label htmlFor="colorPref1" className="color-preference__default"></label>
            <input type="radio" id="colorPref2" name="color" value="" />
            <label htmlFor="colorPref2" className="color-preference__blue"></label>
            <input type="radio" id="colorPref3" name="color" value="" />
            <label htmlFor="colorPref3" className="color-preference__purple"></label>
          </div>
          <Button type="apply" buttonText="Apply" />
        </form>
      </div>
    </div>
    )
  }
  
  return(null)
}

export default Settings