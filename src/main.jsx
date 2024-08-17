// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WidgetProvider } from './context/WidgetContext.jsx';
import './index.css';

ReactDOM.render(
  <WidgetProvider>
    <App />
  </WidgetProvider>,
  document.getElementById('root')
);
