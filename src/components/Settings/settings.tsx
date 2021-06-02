import React from "react";
import Button from "../Button/button";

type SettingsProps = {
  visible: boolean;
  toggleSettingsVisibility: any;
  pomoLength: number;
  setPomoLength: any;
  shortLength: number;
  setShortLength: any;
  longLength: number;
  setLongLength: any;
  fontPref: string;
  setFontPref: any;
  accentColor: string;
  setAccentColor: any;
  closeSettings: any;
  setSecondsLeft: any;
  timerMode: string;
};

const Settings: React.FC<SettingsProps> = (props: SettingsProps) => {
  const fonts = new Map();
  fonts.set("kumbh", `'Kumbh Sans', sans-serif`);
  fonts.set("roboto", `'Roboto Slab', serif`);
  fonts.set("space", `'Space Mono', monospace`);

  const colors = new Map();
  colors.set("default", "#F87070");
  colors.set("blue", "#70F3F8");
  colors.set("purple", "#D881F8");

  const styles = document.documentElement.style;

  const applySettings = (event: any) => {
    event.preventDefault();
    const chosenFont = event.target.font.value as string;
    const chosenColor = event.target.color.value as string;

    props.setPomoLength(event.target.pomodoro.value);
    props.setShortLength(event.target.shortBreak.value);
    props.setLongLength(event.target.longBreak.value);
    props.setFontPref(event.target.font.value);
    props.setAccentColor(event.target.color.value);
    props.closeSettings();

    styles.setProperty("--font-current", fonts.get(chosenFont));
    styles.setProperty("--accent-color", colors.get(chosenColor));

    switch (props.timerMode) {
      case "short":
        props.setSecondsLeft(event.target.shortBreak.value * 60);
        break;
      case "long":
        props.setSecondsLeft(event.target.longBreak.value * 60);
        break;
      default:
        props.setSecondsLeft(event.target.pomodoro.value * 60);
    }
  };

  if (props.visible) {
    return (
      <div className="preferences preferences--visible">
        <div className="preferences__pane">
          <Button
            buttonType="close"
            buttonText="×"
            toggleVisibility={props.toggleSettingsVisibility}
          />
          <h2>Settings</h2>
          <form onSubmit={applySettings}>
            <div className="pane__time-settings">
              <h3>Time (Minutes)</h3>
              <div className="time-settings__form">
                <label htmlFor="pomodoro">pomodoro</label>
                <input
                  type="number"
                  name="pomodoro"
                  id="pomodoro"
                  min="5"
                  max="90"
                  defaultValue={props.pomoLength}
                />
                <label htmlFor="short-break">short break</label>
                <input
                  type="number"
                  name="shortBreak"
                  id="short-break"
                  min="1"
                  max="14"
                  defaultValue={props.shortLength}
                />
                <label htmlFor="long-break">long break</label>
                <input
                  type="number"
                  name="longBreak"
                  id="long-break"
                  min="15"
                  max="30"
                  defaultValue={props.longLength}
                />
              </div>
            </div>

            <div className="pane__font-preference">
              <h3>Font</h3>
              <input
                type="radio"
                id="fontPref1"
                name="font"
                value="kumbh"
                defaultChecked={props.fontPref === "kumbh"}
              />
              <label htmlFor="fontPref1" className="font-preference__kumbh">
                Aa
              </label>
              <input
                type="radio"
                id="fontPref2"
                name="font"
                value="roboto"
                defaultChecked={props.fontPref === "roboto"}
              />
              <label htmlFor="fontPref2" className="font-preference__roboto">
                Aa
              </label>
              <input
                type="radio"
                id="fontPref3"
                name="font"
                value="space"
                defaultChecked={props.fontPref === "space"}
              />
              <label htmlFor="fontPref3" className="font-preference__space">
                Aa
              </label>
            </div>

            <div className="pane__color-preference">
              <h3>Color</h3>
              <input
                type="radio"
                id="colorPref1"
                name="color"
                value="default"
                defaultChecked={props.accentColor === "default"}
              />
              <label
                htmlFor="colorPref1"
                className="color-preference__default"
              ></label>

              <input
                type="radio"
                id="colorPref2"
                name="color"
                value="blue"
                defaultChecked={props.accentColor === "blue"}
              />
              <label
                htmlFor="colorPref2"
                className="color-preference__blue"
              ></label>

              <input
                type="radio"
                id="colorPref3"
                name="color"
                value="purple"
                defaultChecked={props.accentColor === "purple"}
              />
              <label
                htmlFor="colorPref3"
                className="color-preference__purple"
              ></label>
            </div>
            <Button buttonType="apply" buttonText="Apply" />
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default Settings;
