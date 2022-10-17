import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../src/Components/home';
import SignUp  from './Components/sign-up';
import Login from './Components/login';
import {useSelector} from 'react-redux';
import CreatePost from './Components/createPost';

function App() {
  const props = useSelector((state)=>state.login)
  return (
    <BrowserRouter>
      <div className='App' props={props}>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/createPost' element={<CreatePost></CreatePost>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
