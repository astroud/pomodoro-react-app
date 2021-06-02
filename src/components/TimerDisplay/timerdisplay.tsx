import React from "react";
import MuteToggle from "../MuteToggle/mutetoggle";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";

type TimerDisplayProps = {
  timerMode: string;
  percentage: number;
  timeLeft: string;
  isActive: boolean;
  setIsActive: any;
  buttonText: string;
  setButtonText: any;
  volume: number;
  setVolume: any;
};

const startSfx = "/sounds/startTimer.mp3";
const pauseSfx = "/sounds/pauseTimer.mp3";
const TimerDisplay: React.FC<TimerDisplayProps> = (
  props: TimerDisplayProps
) => {
  const [play] = useSound(startSfx, {
    volume: props.volume,
    interrupt: true,
  });
  const [pause] = useSound(pauseSfx, {
    interupt: true,
    volume: props.volume,
  });

  const handleClick = (event: any) => {
    if (event.target.id === "muteButton") {
      return null;
    }

    if (props.timeLeft === "0:00") {
      return null;
    }

    if (props.isActive) {
      pause();
    } else {
      play();
    }
    props.setIsActive(!props.isActive);
    props.setButtonText(
      props.buttonText === "START" || props.buttonText === "RESUME"
        ? "PAUSE"
        : "RESUME"
    );
  };

  const timesUpMsg =
    props.timerMode === "pomo" ? "time for a break" : "back to work!";

  const timeText = props.timeLeft === "0:00" ? timesUpMsg : props.timeLeft;

  const textSize = props.timeLeft === "0:00" ? "12px" : "28px";

  return (
    <div className="timer" onClick={handleClick}>
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={props.percentage}
          text={timeText}
          strokeWidth={4}
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: "var(--accent-color)",
            textColor: "var(--text)",
            textSize: textSize,
            trailColor: "none",
          })}
        >
          <MuteToggle volume={props.volume} setVolume={props.setVolume} />
          <button className="display__start-pause" onClick={handleClick}>
            {props.buttonText}
          </button>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default TimerDisplay;
