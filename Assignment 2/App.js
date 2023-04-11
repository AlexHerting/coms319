import { useState, useRef, useEffect } from 'react';
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
  
  // const removeFromCart = (el) => {
  //   let hardCopy = [...cart];
  //   hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
  //   setCart(hardCopy);
  // };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    const indexToRemove = hardCopy.findIndex((cartItem) => cartItem.id === el.id);
    if (indexToRemove !== -1) {
      hardCopy.splice(indexToRemove, 1);
      setCart(hardCopy);
    }
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
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search"/>
{/* value={query} onChange={handleChange} */}
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
  totalVal += cart[i].price + cart[i].price * 0.06;
  }
  setCartTotal(totalVal);
  };
  

const uniqueItems = Array.from(new Set(cart.map((item) => item.id)))
  .map((id) => {
    return cart.find((item) => item.id === id);
  });

const cartItems = uniqueItems.map((el) => (
  <div class="row border-top border-bottom" key={el.id}>
    <div class="row main align-items-center">
    <div class="col-2">
    <img class="img-fluid" src={el.image} />
    </div>
    <div class="col">
    <div class="row text-muted">{el.title}</div>
    <div class="row">{el.category}</div>
    </div>
    {/* <div class="col">
    </div> */}
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
<span class ="small text-muted me-2">Order total + tax:</span>
<span class ="lead fw-normal">${cartTotal.toFixed(2)}</span>
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

    const [alertMessage, setAlertMessage] = useState(null);
    const [order, setOrder] = useState({
      name: '',
      email: '',
      card: '',
    });

    const formRef = useRef(null);
  
    useEffect(() => {
      const inputCard = document.querySelector('#inputCard')
      const form = document.getElementById('checkout-form')
      //const alertTrigger = formRef.current.querySelector('#submit-btn');
  
      const alert = (message, type) => {
        setAlertMessage({ message, type });
      };
  
      //puts splits between the 4 numbers (only if numeric)
      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
  
      const handleInputCard = (event) => {
        if (!inputCard.value) {
          return event.preventDefault(); // stops modal from being shown
        } else {
          inputCard.value = inputCard.value.replace(/-/g, '');
          let newVal = '';
          for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
            if (nums != 0 && nums % 4 === 0) {
              newVal += '-';
            }
            newVal += inputCard.value[i];
            if (isNumeric(inputCard.value[i])) {
              nums++;
            }
          }
          inputCard.value = newVal;
        }
      };
  
      const handleFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!validate()) {
          alert('<i class="bi-exclamation-circle"></i> Something went wrong!', 'danger');
        }
      };
  
      inputCard.addEventListener('input', handleInputCard);
      form.addEventListener('submit', handleFormSubmit);
  
      return () => {
        inputCard.removeEventListener('input', handleInputCard);
        form.removeEventListener('submit', handleFormSubmit);
      };
    }, []);
    

    let validate = function(){
      let val = true;
      let email = document.getElementById('inputEmail4')
      let name = document.getElementById('inputName')
      let card = document.getElementById('inputCard')
      let form = document.getElementById('checkout-form')
      let summaryList = document.querySelector('.card > ul')
      let summaryCard = document.querySelector('.card')
      let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
      if (!email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
      email.setAttribute("class", "form-control is-invalid");
      val = false;
      }
      else{
      email.setAttribute("class", "form-control is-valid");
      order.email = email.value
      }
      if (name.value.length == 0)
      {
      name.setAttribute("class","form-control is-invalid")
      val = false
      }
      else{
      name.setAttribute("class", "form-control is-valid");
      order.name = name.value
      }
      if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
      {
      card.setAttribute("class","form-control is-invalid")
      val = false
      }
      else{
      card.setAttribute("class", "form-control is-valid");
      order.card = card.value
      }
      if (val){
      form.classList.add("collapse")
      for (const [key, value] of Object.entries(order)) {
      summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` +': </b>' + `${value}` +'</li>'
      }
      summaryCard.classList.remove("collapse")
      alertPlaceholder.innerHTML = ""
      alert('<i class="bi-cart-check-fill"></i> You have made an order!','success')
      }
      return val;
       }

    
  return (
    <div className="container">
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8">
        <h1>Payment Information</h1>
        <div id="liveAlertPlaceholder"></div>
        <form className="row g-3" id="checkout-form"/>
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName"/>
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Must be like, "John Doe"</div>
          </div>
          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4"/>
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Must be like, "abc@xyz.efg"</div>
          </div>
          {/* Credit Card */}
          <div className="col-12">
            <label htmlFor="inputCard" className="form-label">Card</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
              <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="basic-addon1"/>
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Must be like, "7777-7777-7777-7777"</div>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip"/>
          </div>
          <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Check me out
          </label>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success" onClick={validate}> 
          <i className="bi-bag-check"></i> Order
        </button>
      </div>

      <div className="card collapse" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Order summary</h5>
          <p className="card-text">Here is a summary of your order.</p>
        </div>
        <ul className="list-group list-group-flush"></ul>
        <a href="" onClick={() => window.location.reload()} className="btn btn-secondary">
          <i className="bi-arrow-left-circle"></i> Return
        </a>
      </div>

      <div className="col-2"></div>
    </div>
    </div>
    </div>
  );

}
}
export default App;