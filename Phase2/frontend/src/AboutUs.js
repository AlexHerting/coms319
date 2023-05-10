import React from 'react';

const AboutUs = () => {
    return (
      <body className="d-flex h-100 text-center text-white bg-dark">
        <div>
          <h4 style={{textDecorationLine: 'underline', paddingTop: 10}}>About us</h4>
          <p>Welcome to Mouz, our e-commerce website that sells common gaming peripherals, primarily mice, keyboards, and headsets. 
              This store is founded by Alex Herting and TerXun Ng to fulfill the needs of individuals around the globe who enjoy purchasing 
              and utilizing cutting-edge gaming peripherals for their entertainment needs. This store serves the purpose of closing the gap
              between using large e-commerce sites like Amazon or a centralized store like ours for our customers, as it can get really confusing
              for the average consumer to look for what they need, instead of filtering through the millions of contents of the former.
          </p>
          <h4 style={{textDecorationLine: 'underline'}}>Contact us</h4>
          <ul class="list-unstyled">
              <li><a href="https://twitter.com/home?lang=en" class="hov">Follow on Twitter</a></li>
              <li><a href="https://www.facebook.com/" class="hov">Like on Facebook</a></li>
              <li><a href="https://mail.google.com/" class="hov">Email us</a></li>
          </ul>
        </div>
      </body>
    );
  };
  
  export default AboutUs;