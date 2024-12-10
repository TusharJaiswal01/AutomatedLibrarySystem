import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook'; // Book Icon Import
import './Header.css';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {
  const [menutoggle, setMenutoggle] = useState(false);

  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };

  const closeMenu = () => {
    setMenutoggle(false);
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <Link to='/'>
          <a href="#home">
           
          <MenuBookIcon
  className="book-icon"
  style={{
    marginLeft: '130px',  // Adds space between the text and icon
    fontSize: '1.5rem',  // Adjusts the size of the icon
    color: 'white',
    marginTop:"4px" ,
    marginRight:"4px"    // Sets the color of the icon
  }}
/>
{/* Book Icon added here */}
            VidhyaSthali
          </a>
        </Link>
      </div>
      <div className='nav-right'>
        <ul className={menutoggle ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={() => { closeMenu(); }}>
            <Link to='/'>
              <a href="#home">Home</a>
            </Link>
          </li>
          <li className="option" onClick={() => { closeMenu(); }}>
            <Link to='/books'>
              <a href="#books">Books</a>
            </Link>
          </li>
          <li className="option" onClick={() => { closeMenu(); }}>
            <Link to='/signin'>
              <a href='signin'>Login</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mobile-menu" onClick={() => { Toggle(); }}>
        {menutoggle ? (
          <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
        )}
      </div>
    </div>
  );
}

export default Header;
