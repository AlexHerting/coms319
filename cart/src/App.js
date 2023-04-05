import React, { useState, useEffect } from "react";
import items from "./products.json";




  

function App() {
  const [activeView, setActiveView] = useState('browser');
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  const handleButtonClick = (viewName) => {
    setActiveView(viewName);
  };

  let activeComponent;

  switch (activeView) {
    case 'browser':
      activeComponent = <BrowserView />;
      break;
    case 'cart':
      activeComponent = <CartView />;
      break;
    case 'confirmation':
      activeComponent = <ConfirmationView />;
      break;
    default:
      activeComponent = <div>Invalid view selected</div>;
      break;
  }

  return (
    <div>
      <nav>
        <button onClick={() => handleButtonClick('browser')}>Browser</button>
        <button onClick={() => handleButtonClick('cart')}>Cart</button>
        <button onClick={() => handleButtonClick('confirmation')}>Confirmation</button>
      </nav>
      {activeComponent}
    </div>
  );

// BROWSER VIEW 
function BrowserView() {

  const addToCart = (el) => {
    setCart([...cart, el]);
  };
  
  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const listItems = items.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
    <div class="col-2">
    <img class="img-fluid" src={el.image} />
    </div>
    <div class="col">
    <div class="row text-muted">{el.title}</div>
    <div class="row">{el.category}</div>
    </div>
    <div class="col">
    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
    </div>
    <div class="col">
    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
    </div>
    </div>
    </div>
    ));
      function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
      return hmot.length;
      }

      return (
        <div>
        STORE SE/ComS319
        <div class="card">
        <div class="row">
        {/* HERE, IT IS THE SHOPING CART */}
        <div class ="float-end">
  
        </div>
        <div class="col-md-8 cart">
        <div class="title">
        <div class="row">
        <div class="col">
        </div>
        </div>
        </div>
        <div>{listItems}</div>
        </div>
        
        </div>
        </div>
        </div>
        );
} 


// CART VIEW 
function CartView() {
  
  useEffect(() => {
    total();
    }, [cart]);
    
const addToCart = (el) => {
  setCart([...cart, el]);
};

const removeFromCart = (el) => {
  let hardCopy = [...cart];
  const indexToRemove = hardCopy.findIndex((cartItem) => cartItem.id === el.id);
  if (indexToRemove !== -1) {
    hardCopy.splice(indexToRemove, 1);
    setCart(hardCopy);
  }
};


const total = () => {
  let totalVal = 0;
  for (let i = 0; i < cart.length; i++) {
  totalVal += cart[i].price;
  }
  setCartTotal(totalVal);
  };
  

const cartItems = cart.map((el) => (
  <div class="row border-top border-bottom" key={el.id}>
  <div class="row main align-items-center">
  <div class="col-2">
  <img class="img-fluid" src={el.image} />
  </div>
  <div class="col">
  <div class="row text-muted">{el.title}</div>
  <div class="row">{el.category}</div>
  </div>
  <div class="col">
    ${el.price} <span class="close"></span>
    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
    </div>
  </div>
  </div>
  ));

  const listItems = items.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
    <div class="col-2">
    <img class="img-fluid" src={el.image} />
    </div>
    <div class="col">
    <div class="row text-muted">{el.title}</div>
    <div class="row">{el.category}</div>
    </div>
    <div class="col">
    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
    </div>
    <div class="col">
    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
    </div>
    </div>
    </div>
    ));
      function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
      return hmot.length;
      }
      
    
   return (
<div>
STORE SE/ComS319
<div class="card">
<div class="row">
{/* HERE, IT IS THE SHOPING CART */}
<div class ="float-end">
<p class ="mb-0 me-5 d-flex align-items-center">
<span class ="small text-muted me-2">Order total:</span>
<span class ="lead fw-normal">${cartTotal}</span>
</p>
</div>
<div class="col-md-8 cart">
<div class="title">
<div class="row">
<div class="col">
<h4>
<b>319 Shopping Cart</b>
</h4>
</div>
<div class="col align-self-center text-right text-muted">
Products selected {cart.length}
</div>
</div>
</div>
<div>{cartItems}</div>
</div>

</div>
</div>
</div>
);
}

//CONFIRMATION VIEW 
function ConfirmationView() {
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
    totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
    };
  return (
  <div>This is the Confirmation view</div>
  );
}
}
export default App;

