import logo from './logo.svg';
import './App.css';
// App.js
import React, { useState } from 'react';
import Display1 from './Display1';
import Display2 from './Display2';
import Display3 from './Display3';
import Display4 from './Display4';

const App = () => {
  const [display, setDisplay] = useState('display1');

  const handleDisplayChange = (displayName) => {
    setDisplay(displayName);
  };

  let displayComponent;
  switch (display) {
    case 'display1':
      displayComponent = <Display1 />;
      break;
    case 'display2':
      displayComponent = <Display2 />;
      break;
    case 'display3':
      displayComponent = <Display3 />;
      break;
    case 'display4':
      displayComponent = <Display4 />;
      break;
    default:
      displayComponent = <Display1 />;
  }

  const handleGet = () => {
    fetch('http://localhost:8081/listUsers')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var container = document.getElementById("showData");
        container.innerHTML = JSON.stringify(data, undefined, 2);
      });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleDisplayChange('display1')}>Add a new product</button>
        <button onClick={() => handleDisplayChange('display2')}>See all products</button>
        <button onClick={() => handleDisplayChange('display3')}>Update a product</button>
        <button onClick={() => handleDisplayChange('display4')}>Delete a product</button>
      </div>
      <div>{displayComponent}</div>
    </div>
  );
};




export default App;

