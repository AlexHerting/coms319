import { useState, useRef, useEffect } from 'react';
import items from "./products.json";

function App() {
  const [activeView, setActiveView] = useState('browser');
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  // const [query, setQuery] = useState('');
  // const [ProductsCategory, setProductsCategory] = useState(items);
  
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
      <nav id='navBar'>
        <button onClick={() => handleButtonClick('browser')}>Browser</button>
        <button onClick={() => handleButtonClick('cart')}>Cart</button>
      </nav>
      {activeComponent}
    </div>
  );

  function BrowserView() {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
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
  
    const filteredItems = items.filter((el) => el.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const listItems = filteredItems.map((el) => (
      <div className="row border-top border-bottom" key={el.id}>
        <div className="row main align-items-center">
          <div className="col-2">
            <img className="img-fluid" src={el.image} />
          </div>
          <div className="col">
            <div className="row text-muted">{el.title}</div>
            <div className="row">{el.category}</div>
          </div>
          <div className="col">
            <button type="button" variant="light" onClick={() => removeFromCart(el)}> - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
          </div>
          <div className="col">
            ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
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
        <nav id='navBar'>
          <input type='text' placeholder='Search' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
          {/* <button onClick={() => handleButtonClick('browser')}>Browser</button>
          <button onClick={() => handleButtonClick('cart')}>Cart</button> */}
        </nav>
        {listItems}
      </div>
    );
  }

  
// BROWSER VIEW 
// function BrowserView() {

//   const addToCart = (el) => {
//     setCart([...cart, el]);
//   };
  
//   // const removeFromCart = (el) => {
//   //   let hardCopy = [...cart];
//   //   hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
//   //   setCart(hardCopy);
//   // };

//   const removeFromCart = (el) => {
//     let hardCopy = [...cart];
//     const indexToRemove = hardCopy.findIndex((cartItem) => cartItem.id === el.id);
//     if (indexToRemove !== -1) {
//       hardCopy.splice(indexToRemove, 1);
//       setCart(hardCopy);
//     }
//   };

//   const listItems = items.map((el) => (
//     // PRODUCT
//     <div className="row border-top border-bottom" key={el.id}>
//       <div className="row main align-items-center">
//         <div className="col-2">
//           <img className="img-fluid" src={el.image} />
//         </div>
//         <div className="col">
//           <div className="row text-muted">{el.title}</div>
//           <div className="row">{el.category}</div>
//         </div>
//         <div className="col">
//           <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
//           <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
//         </div>
//         <div className="col">
//           ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
//         </div>
//       </div>
//     </div>
//   ));

//   function howManyofThis(id) {
//     let hmot = cart.filter((cartItem) => cartItem.id === id);
//     return hmot.length;
//   }

//   // function handleClick(tag){
//   //   let filtered = listItems.filter(el => el.category === tag);
//   //   setProductsCategory(filtered);
//   // }
//   const [query, setQuery] = useState('');
//   const [ProductsCategory, setProductsCategory] = useState(items);
      
//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     console.log("Step 6 : in handleChange, Target Value :",e.target.value,"  Query Value :",query);
//     const results = ProductsCategory.filter(eachProduct => {
//     if (e.target.value === "") return ProductsCategory;
//       return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
//     });
//     setProductsCategory(results);
//   }

//   return (
//     <div>
//       <h1>STORE SE/ComS319</h1>
//       <div className="py-10">
//         <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />
//       </div>
//       <div className="col">
//         <h3>
//           <b>319 Shop Browser</b>
//         </h3>
//       </div>
//       <div className="card">
//         <div className="row">
//           {/* HERE, IT IS THE SHOPING CART */}
//           <div className="col-md-8 cart">
//             <div className="title">
//               <div className="row">
//               </div>
//             </div>
//             <div>{listItems}</div>
//             <div><button onClick={() => handleButtonClick('cart')}>Checkout</button></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.title}</div>
          <div className="row">{el.category}</div>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>{howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }
  
  // FORM VALIDATION
  const [alertMessage, setAlertMessage] = useState(null);
  const [order, setOrder] = useState({
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
        alert('<i className="bi-exclamation-circle"></i> Something went wrong!', 'danger');
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
    let email = document.getElementById('inputEmail4');
    let name = document.getElementById('inputName');
    let card = document.getElementById('inputCard');
    let address = document.getElementById('inputAddress');
    let state = document.getElementById('inputState');
    let zip = document.getElementById('inputZip');
    let city = document.getElementById('inputCity');
    let form = document.getElementById('checkout-form')
    let summaryList = document.getElementById('summList')
    let summaryCard = document.getElementById('summCard')
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    let navBar = document.getElementById('navBar');
    let cartTitle = document.getElementById('cartTitle');
    let orderTitle = document.getElementById('orderTitle');
    let returnBtn = document.getElementById('returnBtn');
    
    if (!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
        email.setAttribute("class", "form-control is-invalid");
        val = false;
    }
    else
    {
      email.setAttribute("class", "form-control is-valid");
      order.Email = email.value
    }
    if (name.value.length == 0)
    {
      name.setAttribute("class","form-control is-invalid")
      val = false
    }
    else
    {
      name.setAttribute("class", "form-control is-valid");
      order.Name = name.value
    }
    if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
    {
      card.setAttribute("class","form-control is-invalid")
      val = false
    }
    else
    {
      card.setAttribute("class", "form-control is-valid");
      order.Card = card.value
    }
    //Validate address
    if (address.value.length == 0)
    {
      address.setAttribute("class","form-control is-invalid")
      val = false
    }
    else{
      address.setAttribute("class", "form-control is-valid");
      order.Address = address.value
    }
    //Validate city
    if (city.value.length == 0)
    {
      city.setAttribute("class","form-control is-invalid")
      val = false
    }
    else{
      city.setAttribute("class", "form-control is-valid");
      order.City = city.value
    }
    //Validate state
    if (state.value.length == 0)
    {
      state.setAttribute("class","form-control is-invalid")
      val = false
    }
    else{
      state.setAttribute("class", "form-control is-valid");
      order.State = state.value
    }
    //Validate zip
    if (zip.value.length == 5 && !isNaN(zip.value))
    {
      zip.setAttribute("class", "form-control is-valid");
      order.Zip = zip.value;
    }
    else{
      zip.setAttribute("class","form-control is-invalid");
      val = false;
    }

    if (val){
      form.classList.add("collapse")
      for (const [key, value] of Object.entries(order)) {
        summaryList.innerHTML += '<li className="list-group-item"> <b>' + `${key}` +': </b>' + `${value}` +'</li>'
      }
      summaryCard.classList.remove("collapse")
      alertPlaceholder.innerHTML = ""
      // alert('<i className="bi-cart-check-fill"></i> You have made an order!','success')
      navBar.classList.add("collapse");
      returnBtn.classList.add("collapse");
      cartTitle.classList.add("collapse");
      orderTitle.classList.remove("collapse");
    }
    return val;
  }
    
  return (
    <div>
      <h1>STORE SE/ComS319</h1>
      <div className="card">
        <div className="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h3 id='cartTitle'>
                    <b>319 Shopping Cart</b>
                  </h3>
                  <h3 id='orderTitle' className='collapse'>
                    <b>Ordered Items</b>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div>{cartItems}</div>
          <div>
            <p className ="mb-0 me-5 d-flex align-items-center">
              <span className ="small text-muted me-2">Order total + tax:</span>
              <span className ="lead fw-normal">${cartTotal.toFixed(2)}</span>
            </p>
          </div>
          <div className="col align-self-center text-right text-muted">
                Products selected: {cart.length}
          </div>
          <div><button id='returnBtn' onClick={() => handleButtonClick('browser')}>Return</button></div>
        </div>
      </div>

      <h3>Payment Information</h3>
      <div id="liveAlertPlaceholder"></div>
      <form className="row g-3" id="checkout-form">
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
        {/* Address 1 */}
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "1234 Main St"</div>
        </div>
        {/* Address 2 */}
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
        </div>
        {/* City */}
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity"/>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "Ames"</div>
        </div>
        {/* State */}
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">State</label>
          <input type="text" className="form-control" id="inputState"/>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "Iowa"</div>
        </div>
        {/* Zip */}
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">Zip</label>
          <input type="text" className="form-control" id="inputZip"/>
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Must be like, "55555"</div>
        </div>

        {/* Order Button */}
        <div className="col-12">
          <button id="orderBtn" type="submit" className="btn btn-success" onClick={validate}> 
            <i className="bi-bag-check"></i> Order
          </button>
        </div>
      </form>

      <div id='summCard' className="card collapse" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Order summary</h5>
          <p className="card-text">Here is a summary of your order.</p>
        </div>
        <ul id='summList' className="list-group list-group-flush"></ul>
        <a href="" onClick={() => window.location.reload()} className="btn btn-secondary">
          <i className="bi-arrow-left-circle"></i> Start Over
        </a>
      </div>
    </div>
  );
}

//CONFIRMATION VIEW
function ConfirmationView() {
  return (<div></div>
  );
}
}
export default App;

