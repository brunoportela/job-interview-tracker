import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
require('babel-polyfill');

render(<App />, document.getElementById('root'));
