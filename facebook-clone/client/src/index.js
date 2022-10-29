import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import allReducers from './components/reducers/combinedReducer';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: allReducers
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);