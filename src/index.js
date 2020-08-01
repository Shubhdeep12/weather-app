import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {bg} from './App'
var bb=document.getElementsByName('body')
console.log(bb)
//bb[0].style.setProperty('background',"C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/fog.png")
ReactDOM.render(
  <React.StrictMode>
  
  
  
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
