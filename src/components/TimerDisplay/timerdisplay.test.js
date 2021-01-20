import React from 'react';
import ReactDOM from 'react-dom';
import TimerDisplay from './timerdisplay';

it('TimerDisplay renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimerDisplay />, div);
});