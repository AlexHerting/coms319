fetch("products.json")
.then(response => response.json())
.then(data => dataToArray(data))

let products = [];
let totalPrice = 0;
let cart = [];
let counter = 0;
let itemNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//The data from the Json file is now in the array "products"
function dataToArray(data) {
    console.log(data);
    products = data;
    console.log(products);
   
}

function addItem(itemNum) {

  const numberOfItems = document.getElementById("numOfItems" + itemNum);
  itemNumbers[itemNum]++;


  numberOfItems.textContent = itemNumbers[itemNum];

  const total = document.getElementById("total");

  totalPrice = totalPrice + products.products[itemNum - 1].price;
  total.textContent = totalPrice;


}

function takeAwayItem(itemNum) {

  const numberOfItems = document.getElementById("numOfItems" + itemNum);
  if (itemNumbers[itemNum] == 1) {
    removeItem(itemNum);
    itemNumbers[itemNum] = 0;
    return;
  } else {
    itemNumbers[itemNum]--;
    numberOfItems.textContent = itemNumbers[itemNum];
  }
  

  const total = document.getElementById("total");

  totalPrice = totalPrice - products.products[itemNum - 1].price;
  total.textContent = totalPrice;


}






//Removes an item from the temporary shopping cart below
function removeItem(itemNumber) {


const remover = document.getElementById(itemNumber);
const total = document.getElementById("total");

totalPrice = totalPrice - products.products[itemNumber - 1].price;
total.textContent = totalPrice;

itemNumbers[itemNumber ] = 0;

remover.remove();

}

function addToCart(itemId) {

    // console.log(products);
    // console.log(itemId);
    let item = products.products[itemId]; // Retrieve the item from the array
    // console.log(item);
    
    container = document.getElementById("contain");
    let cartItem = document.createElement("cart");
    let total = document.getElementById("total");
    
    
  if (container == null) {

    console.log("null cont");
  }
  
    // Set the content and attributes of the elements
    let name = item.name;
    let price = item.price;
    let imgUrl = item.url;
    let id = item.productId;
    if (itemNumbers[id] != 0) {
      return;
    }
    itemNumbers[id] = 1;
  totalPrice = totalPrice + price;
  total.textContent = totalPrice;

  console.log(totalPrice);
    cartItem.innerHTML = `
    <div id="${id}">
    <div class="card-body" id="bot">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <div id="imageHolder">
            <img 
               src="${imgUrl}" 
              class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
              
          </div>
          <div class="ms-3">
            <h5>${name}</h5>
            <!-- <p class="small mb-0">256GB, Navy Blue</p> -->
          </div> 
        </div>
        <div class="d-flex flex-row align-items-center">
          <div style="width: 50px;">
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick='addItem(${id});'>+</i></button>
            <h5 class="fw-normal mb-0" id="numOfItems${id}">1</h5>      
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick='takeAwayItem(${id});'>-</i></button> 
          </div>
          <div style="width: 80px;">
            <h5 class="mb-0">$${price}</h5>
          </div>
          <a href="#!" onclick='removeItem(${id});'; style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
    </div>
    
    `;
    container.appendChild(cartItem);
    
  }
