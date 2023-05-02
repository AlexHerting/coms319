import React, { useEffect, useState } from 'react';

const Display1 = () => {
  const [products, setProducts] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
  };

  const selectedProduct = products.find(product => product._id === selectedItemId);

  if (selectedItemId && selectedProduct) {
    return (
    <div>
        <button onClick={handleGoBack}>Go Back</button>
        <div>
          <h4>{selectedProduct.title}</h4>
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>

        
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
                    </div>
                  </div>
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
