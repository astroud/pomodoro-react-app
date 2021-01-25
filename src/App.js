import './App.css';
import Header from './components/Header/header'
import Controls from './components/Controls/controls'
import TimerDisplay from './components/TimerDisplay/timerdisplay'
import Button from './components/Button/button'
import Settings from './components/Settings/settings'


function App() {
  return (
    <div className="pomodoro-app">
      <Header title="pomodoro" />
      <Controls />
      <TimerDisplay />
      <Button type="settings" />
      <Settings visible={false} />
    </div>
  );
}

export default App;
