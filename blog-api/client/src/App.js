import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../src/Components/home'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
