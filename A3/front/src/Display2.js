// Display2.js
import React from 'react';

const handleGet = () => {
    fetch('http://localhost:8081/listUsers')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var container = document.getElementById("showData");
        container.innerHTML = JSON.stringify(data, undefined, 2);
      });
  };

const Display1 = () => {
  return (
    <div>
      <h1>This is Display 2</h1>
      <h1>Get Method.</h1>
      <button onClick={handleGet}>Get users</button>
      <div id="showData"></div>
    </div>
  );
};

export default Display1;
