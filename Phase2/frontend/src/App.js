import React, { useState } from 'react';
import Display1 from './Display1';
import Display2 from './Display2';
import Display3 from './Display3';
import Display4 from './Display4';
import Credits from './Credits';
import AboutUs from './AboutUs';

const App = () => {
  const [display, setDisplay] = useState('display1');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogSuccess = (username) => {
    setLoggedInUser(username);
  };

  const handleDisplayChange = (displayName) => {
    setDisplay(displayName);
  };

  const handleLoginSuccess = () => {
    setDisplay('display1');
  }

  const handleShowLoginForm = () => {
    setDisplay('display4');
  }

  let displayComponent;
  switch (display) {
    case 'display1':
      displayComponent = <Display1 />;
      break;
    case 'display2':
      displayComponent = <Display2 />;
      break;
    case 'display3':
      displayComponent = <Display3 />;
      break;
    case 'display4':
      displayComponent = <Display4 onLoginSuccess={handleLoginSuccess} handleLogSuccess={handleLogSuccess}/>;
      break;
    case 'aboutus':
      displayComponent = <AboutUs />;
      break;
    case 'credits':
      displayComponent = <Credits />;
      break;
    default:
      displayComponent = <Display1 />;
  }

  return (
    <div>
      {display !== 'display4' && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" aria-label="Eleventh navbar example">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarsExample09">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={() => handleDisplayChange('display1')}>Store</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('display2')} >Create</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('aboutus')}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('credits')}>Credits</a>
                </li>
              </ul>
              <p style={{paddingTop:12, paddingRight: 12}}>Welcome {loggedInUser}!</p>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleShowLoginForm} style={{padding:5}}>
              Log Out <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </nav>
      )}

      <div>{displayComponent}</div>
    </div>
  );
};

export default App;
