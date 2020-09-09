import React from 'react';
import './App.css';
import {DefaultPanel} from "./DefaultPanel";
import {DefaultAppBar} from "./DefaultAppBar";


function App() {
  return (
    <div className="App">
        <DefaultAppBar/>
        <DefaultPanel/>
    </div>
  );
}

export default App;
