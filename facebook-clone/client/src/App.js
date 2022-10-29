import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/:id' element={<Home></Home>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
