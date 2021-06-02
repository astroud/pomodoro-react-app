import React, { MouseEventHandler } from "react";
import useSound from "use-sound";

const clickSfx = "/sounds/slide.mp3";

type ControlProps = {
  timerMode: string;
  setTimerMode: any;
  setSecondsLeft: any;
  pomoLength: number;
  shortLength: number;
  longLength: number;
  setIsActive: any;
  setButtonText: any;
  volume: any;
};

const Controls: React.FC<ControlProps> = (props: ControlProps) => {
  const [playSfx] = useSound(clickSfx, { volume: props.volume });
  const handleModeChange = (event: any) => {
    props.setTimerMode(event.target.id);
    props.setIsActive(false);
    props.setButtonText("START");
    switch (event.target.id) {
      case "short":
        props.setSecondsLeft(props.shortLength * 60);
        break;
      case "long":
        props.setSecondsLeft(props.longLength * 60);
        break;
      default:
        props.setSecondsLeft(props.pomoLength * 60);
    }
  };

  return (
    <form className="controls">
      <input
        type="radio"
        id="pomo"
        name="mode"
        checked={props.timerMode === "pomo"}
        onClick={playSfx as MouseEventHandler}
        onChange={handleModeChange}
      />
      <label htmlFor="pomo" className="controls__button">
        pomodoro
      </label>

      <input
        type="radio"
        id="short"
        name="mode"
        checked={props.timerMode === "short"}
        onClick={playSfx as MouseEventHandler}
        onChange={handleModeChange}
      />
      <label htmlFor="short" className="controls__button">
        short break
      </label>

      <input
        type="radio"
        id="long"
        name="mode"
        checked={props.timerMode === "long"}
        onClick={playSfx as MouseEventHandler}
        onChange={handleModeChange}
      />
      <label htmlFor="long" className="controls__button">
        long break
      </label>
    </form>
  );
};

export default Controls;
