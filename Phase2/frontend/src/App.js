import React, { useState } from 'react';
import Display1 from './Display1';
import Display2 from './Display2';
import Display3 from './Display3';
import Display4 from './Display4';
import Credits from './Credits';

const App = () => {
  const [display, setDisplay] = useState('display4');

  const handleDisplayChange = (displayName) => {
    setDisplay(displayName);
  };

  const handleLoginSuccess = () => {
    setDisplay('display1');
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
      displayComponent = <Display4 onLoginSuccess={handleLoginSuccess} />;
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
                  <a className="nav-link active" aria-current="page" onClick={() => handleDisplayChange('display1')}>All Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('display2')} >Search Items</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('display3')}>Headsets</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => handleDisplayChange('credits')}>About Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <div>{displayComponent}</div>
    </div>
  );
};

export default App;
