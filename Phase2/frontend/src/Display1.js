import React, { useEffect, useState } from 'react';

const Display1 = () => {
  const [products, setProducts] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rating, setRating] = useState(0);

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
  

  

  const selectedProduct = products.find(product => product._id === selectedItemId);

  if (selectedItemId && selectedProduct) {
    return (
      <div>
        <button onClick={handleGoBack}>Go Back</button>
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
                <button type="button" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
    <button onClick={handleGet}>Refresh Products</button>
  
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {products.map(product => (
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
                  <div className="confirmation-modal">
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={() => handleDeleteItemConfirmed(product._id)}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
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
