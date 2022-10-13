import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './Components/sign-up';
import Login from './Components/login';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/sign_up' element={<SignUp></SignUp>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
