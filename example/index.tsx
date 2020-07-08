import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { configKeepAlive } from 'keep-alive-comp';

// optional/可以不写
// configKeepAlive({ maxLength: 2, useStorage: 'sessionStorage' });

const root = document.getElementById('example');
ReactDOM.render(<App />, root);
