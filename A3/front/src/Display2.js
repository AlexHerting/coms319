// Display1.js
import React from 'react';

const handleGet = () => {
    fetch('http://localhost:8081/listUsers')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var container = document.getElementById("showData");
        container.innerHTML = '';
        data.forEach(item => {
          const itemContainer = document.createElement("div");
          const itemId = document.createElement("h1");
          itemId.innerText = item.id;
          itemContainer.appendChild(itemId);
          for (const [key, value] of Object.entries(item)) {
            const prop = document.createElement("p");
            prop.innerText = `${key}: ${value}`;
            itemContainer.appendChild(prop);
          }
          container.appendChild(itemContainer);
        });
      });
  };

const Display2 = () => {
  return (
    <div>
      <h1>This is Display 2</h1>
      <h1>Get Method.</h1>
      <button onClick={handleGet}>Get users</button>
      <div id="showData"></div>
    </div>
  );
};

export default Display2;
