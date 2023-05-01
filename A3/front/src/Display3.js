import React, { useState } from "react";

const Display3 = () => {
  const [searchId, setSearchId] = useState("");
  const [price, setPrice] = useState("");
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    fetch("http://localhost:8081/listUsers")
      .then((response) => response.json())
      .then((data) => {
        const result = data.find((item) => item._id == searchId);
        if (result) {
          setItem(result);
          setNotFound(false);
        } else {
          setItem(null);
          setNotFound(true);
        }
      });
  };

  function updateProduct(updatedPrice) {
    item.price = updatedPrice;

    fetch(`http://localhost:8081/users/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      }); 
  }

  // const handlePriceChange = (event) => {
  //   event.preventDefault();
  //   fetch(`http://localhost:8081/users/${searchId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ price: searchId1 }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItem(data);
  //       setSearchId("");
  //       setSearchId1("");
  //     });
  // };

  

  return (
    <div>
      <h1>Display 3</h1>

      <nav className="navbar navbar-light bg-light">
        <form className="form-inline" onSubmit={handleSearch}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by ID"
            aria-label="Search"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
          
          
        </form>

        {item ? (
          <form className="form-inline" onSubmit={() => updateProduct(price)}>
            <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Type New Price"
                  aria-label="Search"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Change Price
            </button>
          </form>
            ) : notFound ? (
           <div>
           </div>
        ) : null}
      </nav>

      {item ? (
        <div>
          <h2>ID: {item._id}</h2>
          <p>Title: {item.title}</p>
          <p>Price: ${item.price}</p>
          <p>Description: {item.description}</p>
          <p>category: {item.category}</p>
          <img src={item.image}></img>
          <p>Rate: {item.rating.rate}</p>
          <p>count: {item.rating.count}</p>
        </div>
      ) : notFound ? (
        <h2>Item not found</h2>
      ) : null}
    </div>
  );
};

export default Display3;
