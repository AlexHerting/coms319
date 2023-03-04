fetch("products.json")
.then(response => response.json())
.then(data => dataToArray(data))

let products = [];
let totalPrice = 0;

//The data from the Json file is now in the array "products"
function dataToArray(data) {
    console.log(data);
    products = data;
    console.log(products);
   
}


function addToCart(itemId) {
    console.log(products);
    console.log(itemId);
    let item = products.products[itemId]; // Retrieve the item from the array
    console.log(item);
    
    container = document.getElementById("contain");
    let cartItem = document.createElement("cart");
    
    
  if (container == null) {

    console.log("null cont");
  }
  
    // Set the content and attributes of the elements
    let name = item.name;
    let price = item.price;
    let imgUrl = item.url;
 
  totalPrice = totalPrice + price;
  console.log(totalPrice);
    cartItem.innerHTML = `
    
    <div class="card-body">
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
            <h5 class="fw-normal mb-0">1</h5>
          </div>
          <div style="width: 80px;">
            <h5 class="mb-0">$${price}</h5>
          </div>
          <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
    
    
    `;
    localStorage.setItem("myVar", "Hello from index!");
    localStorage.setItem("cart", `
    
    <div class="card-body">
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
            <h5 class="fw-normal mb-0">1</h5>
          </div>
          <div style="width: 80px;">
            <h5 class="mb-0">$${price}</h5>
          </div>
          <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
    
    
    `);
    const myData = "Hello, world!";
    window.location.href = `cart.html?data=${encodeURIComponent(`
    
    <div class="card-body">
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
            <h5 class="fw-normal mb-0">1</h5>
          </div>
          <div style="width: 80px;">
            <h5 class="mb-0">$${price}</h5>
          </div>
          <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
    
    
    `)}`;
    console.log(cartItem.innerHTML);
    container.appendChild(cartItem);
  }
