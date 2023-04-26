// Display1.js
import React from 'react';


const handleSubmit = (event) => {
  event.preventDefault(); // prevent default form submission behavior
  
  const form = event.target; // get the form element
  const formData = new FormData(form); // create a FormData object with the form data
  
  // Get the values from the FormData object
  const id = formData.get("id");
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image");
  const rate = formData.get("rate");
  const count = formData.get("count");

  fetch('http://localhost:8081/addUser', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      "id": id,
      "title": title,
      "price": price,
      "description": description,
      "category": category,
      "image": image,
      "rating": {
        "rate": rate,
        "count": count
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    var container = document.getElementById("showData");
    container.innerHTML = JSON.stringify(data);
  });
  
  alert("Success");
  // Do something with the form data
  console.log(id, title, price, description, category, image, rate, count);
};

const Display1 = () => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="id">Id</label>
        <input className="form-control" id="id" name="id" placeholder="Enter an id #" required/>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input className="form-control" id="title" name="title" placeholder="Enter a title for the product" required/>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input className="form-control" id="price" name="price" placeholder="Enter a price for the product $" required/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" name="description" placeholder="Enter a description of the product" required/>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input className="form-control" id="category" name="category" placeholder="Enter a category for the product" required/>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input className="form-control" id="image" name="image" placeholder="Enter an image link for the product" required/>
      </div>
      <div className="form-group">
        <label htmlFor="rate">Rate</label>
        <input className="form-control" id="rate" name="rate" placeholder="Enter a rating out of 5 for the product" required/>
      </div>
      <div className="form-group">
        <label htmlFor="count">Count</label>
        <input className="form-control" id="count" name="count" placeholder="Enter a product count" required/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

      <div id="showData"></div>
    </form>

    
  );
};

export default Display1;
