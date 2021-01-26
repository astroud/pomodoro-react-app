import './App.css';
import Header from './components/Header/header'
import Controls from './components/Controls/controls'
import TimerDisplay from './components/TimerDisplay/timerdisplay'
import Button from './components/Button/button'
import Settings from './components/Settings/settings'
import { useState } from 'react';


function App() {
  const [ settingsVisible, setSettingsVisible ] = useState(false)
  const [ timerMode, setTimerMode ] = useState('pomo')   // options: pomo, short, long

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  return (
    <div className="pomodoro-app">
      <Header title="pomodoro" />
      <Controls timerMode={timerMode} setTimerMode={setTimerMode} />
      <TimerDisplay />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Settings visible={settingsVisible} toggleSettingsVisibility={toggleSettingsVisibility} />
    </div>
  );
}

export default App;
