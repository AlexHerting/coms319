import React, { useEffect, useState } from 'react';

const Display1 = () => {
  const [products, setProducts] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const handleGet = () => {
    fetch('http://localhost:8081/allProducts')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleViewItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleGoBack = () => {
    setSelectedItemId(null);
    handleGet();
  };

  
  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value, 10);
    setRating(newRating);
  };

  const handleSubmit = () => {
    const currentRate = selectedProduct.rating.rate;
    const currentCount = selectedProduct.rating.count;
  
    const newRate = ((currentRate * currentCount + rating) / (currentCount + 1)).toFixed(2);
    const newCount = currentCount + 1;
  
    const updatedProduct = {
      ...selectedProduct,
      rating: { rate: newRate, count: newCount },
    };
  
    fetch(`http://localhost:8081/products/${selectedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          console.log('Product rating updated successfully');
          alert("Product rating updated successfully.");
          handleGet();
        } else {
          throw new Error('Error updating product rating');
        }
      })
      .catch(error => {
        console.error('Error updating product rating:', error);
      });
  
    setRating(0);
  };
  
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  
  function handleConfirmDelete(productId) {
    setProductIdToDelete(productId);
    setShowConfirmation(productId);
  }
  
  function handleDeleteItemConfirmed(productId) {
    // Send delete request to the server with the productId
    fetch(`http://localhost:8081/delete/${productId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Handle success or update the UI accordingly
        alert("Product has been successfully deleted.");
        handleGet();
      })
      .catch(error => {
        console.error('Error deleting the product:', error);
        // Handle error or update the UI accordingly
      });
  
    setShowConfirmation(null);
  }
  
  function handleCancelDelete() {
    setShowConfirmation(null);
  }
  
  /*
  CART
  */
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    const indexToRemove = hardCopy.findIndex((cartItem) => cartItem._id === el._id);
    if (indexToRemove !== -1) {
      hardCopy.splice(indexToRemove, 1);
      setCart(hardCopy);
    }
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem._id === id);
    return hmot.length;
  }

  function setCheckoutTrue()
  {
    setShowCheckout(true);
  }

  function setCheckoutFalse()
  {
    setShowCheckout(false);
  }

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price + cart[i].price * 0.06;
    }
    setCartTotal(totalVal);
  };

  function clearCart()
  {
    setCart([]);
  }

  function clearSearch()
  {
    setSearchQuery('');
  }

  const selectedProduct = products.find(product => product._id === selectedItemId);
  const searchedItems = products.filter((el) => el.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const uniqueItems = Array.from(new Set(cart.map((item) => item._id)))
    .map((id) => {
      return cart.find((item) => item._id === id);
  });

  const cartItems = uniqueItems.map((el) => (
    <div className="row border-top border-bottom" key={el._id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.title}</div>
          <div className="row">{el.category}</div>
        </div>
        <div className="col">
          ${el.price} x {howManyofThis(el._id)}
        </div>
      </div>
    </div>
  ));

  if (selectedItemId && selectedProduct) {
    return (
      <div>
        <div style={{padding:10}}>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleGoBack} style={{padding:5}}>
          Go Back <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
        <div className="wrapper">
          <div className="product-img">
            <img src={selectedProduct.image} height="420" width="327" alt="Product" />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>{selectedProduct.title}</h1>
              <h2>{selectedProduct.category}</h2>
              <p>{selectedProduct.description}</p>
            </div>
            <div style={{paddingLeft: 20}}>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(selectedProduct)} style={{paddingRight: 45}}> 
              Add 1 to cart<i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div> 
            <div style={{paddingLeft: 20, paddingTop: 10}}>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => removeFromCart(selectedProduct)} style={{padding: 5}}> 
              Remove 1 from cart<i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
            <div className="col" style={{paddingLeft: 20, paddingTop: 10}}>
              Quantity: {howManyofThis(selectedProduct._id)}
            </div>
            <div className="product-price-btn">
              <p>
                ${selectedProduct.price}
              </p>
              <p>{selectedProduct.rating.rate}/5 Stars</p>
              <div>
                <select value={rating} onChange={handleRatingChange}>
                  <option value={0}>Select Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <div style={{paddingTop: 10}}>
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleSubmit} style={{padding: 5}}> 
                  Submit Rating<i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout)
  {
    return (
      <div> 
        <div style={{padding: 10}}>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={setCheckoutFalse} style={{padding: 5}}> 
            Back to Store<i className="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
        <h3 style={{padding: 10}}>Shopping Cart</h3>
        <div className='bg-light' style={{padding: 20}}>{cartItems}</div>
        <div>
          <p className ="mb-0 me-5 d-flex align-items-center" style={{padding: 10}}>
            <span className ="small text-muted me-2">Total (w/ tax):</span>
            <span className ="lead fw-normal">${cartTotal.toFixed(2)}</span>
          </p>
        </div>
        <div style={{paddingLeft: 10}}>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clearCart} style={{padding: 5}}> 
            Clear Shopping Cart<i className="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
      </div>
    );
  }

  return (
    <main>
    <div style={{padding: 10}}>
      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleGet} style={{padding: 5}}> 
      Refresh Products<i className="fa-solid fa-cart-shopping"></i>
      </button>
      <input type='text' placeholder='Search' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} style={{padding: 3, float:'right'}}/>
    </div>
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={setCheckoutTrue} style={{paddingRight: 53, paddingLeft: 5, paddingTop: 5, paddingBottom: 5}}> 
        Checkout<i className="fa-solid fa-cart-shopping"></i>
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clearSearch} style={{padding: 5, float: 'right'}}> 
        Clear Search<i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {searchedItems.map(product => (
            <div className="col" key={product._id}>
              <div className="card shadow-sm">
                <img src={product.image} alt={product.title} />
                <div className="card-body">
                  <h4 className="product-name">{product.title}</h4>
                  <p className="card-text" id="prodTxt1"></p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleViewItem(product._id)}>
                        View item <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                    <small className="text-muted">${product.price}</small>    
                    <small className="text-muted">{product.rating.rate} stars ({product.rating.count})</small>
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleConfirmDelete(product._id)}>
                        Delete Item <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {showConfirmation === product._id && (
                  <div className="confirmation-modal" style={{paddingLeft: 15, paddingBottom: 15}}>
                    <p>Are you sure you want to delete this product?</p>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleDeleteItemConfirmed(product._id)}>
                      Yes <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancelDelete}>
                      No <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
  
  
  );
};

export default Display1;
