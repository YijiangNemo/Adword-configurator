import React from 'react'
import './App.css';
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
      <Router>
    <div className="App" style={{backgroundColor:'#203147',padding:24}}>

     <Routes/>
    </div>
      </Router>
  );
}

export default App;
