import './App.css';
import Header from './components/Header/header'
import Controls from './components/Controls/controls'
import TimerDisplay from './components/TimerDisplay/timerdisplay'

function App() {
  return (
    <div className="pomodoro-app">
      <Header title="pomodoro" />
      <Controls />
      <TimerDisplay />
    </div>
  );
}

export default App;
