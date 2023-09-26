import "./App.css"
import {React,useContext, useEffect, useMemo, useState} from 'react';
import { BrowserRouter as Router, 
  Routes , 
  Route, 
  } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from "./components/Todo";
import Home from "./components/Home";
function App() {

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/todo/:username" element={<Todo/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
