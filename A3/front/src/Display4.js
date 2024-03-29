// Display1.js
import React from 'react';
import { useState} from "react";

const Display4 = () => {
  const [searchId, setSearchId] = useState("");
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [checked4, setChecked4] = useState(false);

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

  // const handleDelete = (event) => {
  //   event.preventDefault();
  //   fetch(`http://localhost:8081/delete`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItem(data);
  //       setSearchId("");
  //       setSearchId1("");
  //     });
  // };

  function deleteOneProduct(deleteid) {
    console.log("Product to delete:", deleteid);
    fetch("http://localhost:8081/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed:", deleteid);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4); 
  }

  return (
    <div>
      <h1>Display 4</h1>
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
  <form className="form-inline" onSubmit={() => deleteOneProduct(item._id)}>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
      Delete Item
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

export default Display4;
