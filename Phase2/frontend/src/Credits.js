import React from 'react';

const Credits = () => {
    return (
      <body className="d-flex h-100 text-white bg-dark">
        <div style={{padding: 15}}>
          <h2 style={{textDecorationLine: 'underline'}}>Credits</h2>
          <h4>SE/COMS 319 - Construction of User Interfaces (Spring 2023)</h4>
          <h4>Professor: Dr. Abraham N. Aldaco Gastelum</h4>
          <h4>Date: May 9th, 2023</h4>
          <p><br></br></p>
          <h4>Student 1: Alex Herting - aherting@iastate.edu</h4>
          <h4>Student 2: Ter Xun Ng - terxun@iastate.edu</h4>
          <p><br></br></p>
          <h4>Introduction:</h4>
          <p>This is the finished version of our final project. This is the finished version of our final project. We use GET, PUT, DELETE, and POST methods in the backend to allow basic roundtrip functionality on our website and have also decided to use MongoDB as our database as we are much more familiar and comfortable with using it...<br></br> 
          <br></br>
          The website works by first automatically logging you in as a guest user. The user can then choose to log out and re-login as a registered user. The default page of the website would be the
          store page, which has a search functionality, a "checkout" button to go to a cart view, and a "view item" button to view individual items, which can then be used to add item
          to cart or update ratings using PUT. Furthermore, the item(s) can also be deleted from the store using DELETE or refreshed using GET. In the cart view, the user can see all the products
          added to cart, its total price, as well as buttons to clear the cart or return to store. Last but not least, the "create" button on the navigation bar
          displays a view to enter a form to submit to create a product using POST. Miscellaneous views such as "About Us" and "Credits" can be viewed from the navigation bar.
          </p>
        </div>
      </body>
    );
  };
  
  export default Credits;