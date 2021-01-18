const defaultAccent = '#F87070';
const blueAccent = '#70F3F8';
const purpleAccent = '#D881F8';
const fontDefault = "'Kumbh Sans', sans-serif";
const fontRobotoSlab = "'Roboto Slab', serif";
const fontSpaceMono = "'Space Mono', monospace";

let root = document.documentElement;

const app = document.querySelector('.pomodoro-app');
const preferences = document.querySelector('.preferences');
const prefButton = document.querySelector('button.pomodoro-app__preferences');
const closePrefs = document.querySelector('button.pane__close-preferences');
const btnColorDefault = document.querySelector('button.color-preference__default');
const btnColorBlue = document.querySelector('button.color-preference__blue');
const btnColorPurple = document.querySelector('button.color-preference__purple');
const btnFontDefault = document.querySelector('button.font-preference__kumbh');
const btnFontRoboto = document.querySelector('button.font-preference__roboto');
const btnFontSlab = document.querySelector('button.font-preference__space');


// Handlers
const handlePrefVisibiliy = () => preferences.classList.toggle('preferences--visible');

const handleKeyup = (event) => {
  if (event.code === 'Escape') {
    preferences.classList.remove('preferences--visible');
  }
}

const handleColorPreference = (event, color) => {
  document.querySelector('button.color-preference--active')
          .classList.toggle('color-preference--active');
  event.target.classList.toggle('color-preference--active');
  root.style.setProperty('--accent-color', color);
}

const handleFontPreference = (event, font) => {
  document.querySelector('button.font-preference--active')
          .classList.toggle('font-preference--active');
  event.target.classList.toggle('font-preference--active');
  root.style.setProperty('--font-current', font);
}

// Event listeners
// To pass parameter values, you need to use an anonymous function to call the desired function with the parameters:
prefButton.addEventListener('click', handlePrefVisibiliy);
closePrefs.addEventListener('click', handlePrefVisibiliy);
document.addEventListener('keyup', handleKeyup);

btnColorDefault.addEventListener('click', (event) => {handleColorPreference(event, defaultAccent)});
btnColorBlue.addEventListener('click',  (event) => {handleColorPreference(event, blueAccent)});
btnColorPurple.addEventListener('click', (event) => {handleColorPreference(event, purpleAccent)});

btnFontDefault.addEventListener('click', (event) => {handleFontPreference(event, fontDefault)});
btnFontRoboto.addEventListener('click', (event) => {handleFontPreference(event, fontRobotoSlab)});
btnFontSlab.addEventListener('click', (event) => {handleFontPreference(event, fontSpaceMono)});