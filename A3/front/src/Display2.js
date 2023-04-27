// Display1.js
import React from 'react';

const handleGet = () => {
  fetch('http://localhost:8081/listUsers')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var container = document.getElementById("con");
      container.innerHTML = '';
      data.forEach(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("col");

        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const productName = document.createElement("h4");
        productName.classList.add("product-name");
        productName.innerText = item.title + "  id: " + item._id;
        cardBody.appendChild(productName);

        const productDesc = document.createElement("p");
        productDesc.classList.add("card-text");
        productDesc.innerText = item.description;
        cardBody.appendChild(productDesc);

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("d-flex", "justify-content-between", "align-items-center");


        const price = document.createElement("small");
        price.classList.add("text-muted");
        price.innerText = "$" + item.price.toFixed(2) + " category: " + item.category + " rate: " + item.rating.rate + " count: " + item.rating.count;
        btnGroup.appendChild(price);



        cardBody.appendChild(btnGroup);

        card.appendChild(cardBody);

        itemContainer.appendChild(card);

        container.appendChild(itemContainer);
      });
    });
};


const Display2 = () => {
  return (
    <div>
      <h1>This is Display 2</h1>
      <h1>Get Method.</h1>
      <button onClick={handleGet}>Get all items</button>
      <div class="album py-5 bg-light">
      <div class="container" id="con">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        </div>
    </div>
    </div>
    </div>
  );
};

export default Display2;
