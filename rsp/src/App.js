import logo from './logo.svg';
import Login from './login.jsx';
import Signup from './signup.jsx'
import Container from './container.jsx';
import {Restricted} from './restricted.js'
import Auth from './Auth.js'
import './App.css';
import { Router, Routes, Route } from 'react-router-dom';




function App() {
  
  return (
    <div className="App">
      <Restricted>
      <Routes>
      <Route path = '/' element={<Login/>}/>
      <Route path = '/signup' element={<Signup/>}/>
      <Route element={<Auth/>}>
        <Route path = '/container' element={<Container/>}/>
      </Route>
      </Routes> 
      </Restricted>

    </div>
  );
  
}

export default App;
