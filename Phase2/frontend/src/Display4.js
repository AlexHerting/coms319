import React, { useState } from 'react';

const Display4 = ({ onLoginSuccess, handleLogSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: username, Password: password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('User logged in');
      onLoginSuccess(); // Call the onLoginSuccess prop to change the display
      handleLogSuccess(username);
    } else {
      console.log(data.message);
    }
  };

  const handleCreateAccountSubmit = async (event) => {
    event.preventDefault();
    
    // Check if the username already exists
    const response = await fetch(`http://localhost:8081/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok && data.find((user) => user._id === username)) {
      console.log('Username already exists');
      return;
    }
    
    
    // Create the account if the username does not exist
    const createAccountResponse = await fetch('http://localhost:8081/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: username, Password: password }),
    });
    const createAccountData = await createAccountResponse.json();
    if (createAccountResponse.ok) {
      console.log('Account created');
      onLoginSuccess(); // Call the onLoginSuccess prop to change the display
      handleLogSuccess(username);

    } else {
      console.log(createAccountData.message);
      onLoginSuccess();
      handleLogSuccess(username);
    }
  };
  
  
  return (
    <div>
      <div class="LoginBox">
        <div class="screen">
          <div class="screen__content">
            <form class="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input
                  type="text"
                  class="login__input"
                  placeholder="User name / Email"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  class="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button class="button login__submit" onClick={handleLoginSubmit}>
                <span class="button__text">Log In Now</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
              <button class="button login__submit" onClick={handleCreateAccountSubmit}>
                <span class="button__text">New User</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div class="social-login">
              <div class="social-icons">
                <a href="#" class="social-login__icon fab fa-instagram"></a>
                <a href="#" class="social-login__icon fab fa-facebook"></a>
                <a href="#" class="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>    
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>    
        </div>
      </div>
    </div>  
  );
};

export default Display4;
