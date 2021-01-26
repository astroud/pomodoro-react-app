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
  const [ pomoLength, setPomoLength ] = useState(25)
  const [ shortLength, setShortLength ] = useState(3)
  const [ longLength, setLongLength ] = useState(15)
  const [ fontPref, setFontPref ] = useState('kumbh')         // options: kumbh, roboto, space
  const [ accentColor, setAccentColor ] = useState('default') // options: default, blue, purple

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  return (
    <div className="pomodoro-app">
      <Header title="pomodoro" />
      <Controls timerMode={timerMode} setTimerMode={setTimerMode} />
      <TimerDisplay percentage={16} timeLeft='01:33' />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Settings visible={settingsVisible}
                toggleSettingsVisibility={toggleSettingsVisibility} 
                pomoLength={pomoLength}
                setPomoLength={setPomoLength}
                shortLength={shortLength}
                setShortLength={setShortLength}
                longLength={longLength}
                setLongLength={setLongLength}
                fontPref={fontPref}
                setFontPref={setFontPref}
                accentColor={accentColor}
                setAccentColor={setAccentColor}
                closeSettings={toggleSettingsVisibility}
                />
    </div>
  );
}

export default App;
