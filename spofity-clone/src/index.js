import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {DataLayer} from './Components/DataLayer'
import {initialState,reducer} from './Components/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>
);

