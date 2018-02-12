import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './styles/app.css';
import './styles/index.css';
import './polyfill.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
