import { React, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@material-ui/icons/MenuBook'; // Book Icon Import
import './Header.css';
import axios from "axios";
import { AuthContext } from '../Context/AuthContext';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import { IoIosNotifications } from "react-icons/io";
import ModelComponent from '../Pages/Dashboard/MemberDashboard/Modal';

function Header() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [memberDetails, setMemberDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

  // console.log(user.userType);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get(
          API_URL + "api/users/getuser/" + user._id
        );
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [API_URL, user]);


  const [menutoggle, setMenutoggle] = useState(false);

  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };

  const closeMenu = () => {
    setMenutoggle(false);
  };

  return (
    <div className="header">
     <ModelComponent show={modalShow}
        onHide={() => setModalShow(false)} />
      <div className="logo-nav">


        <Link to='/'>
          <a href="#home">

            <MenuBookIcon
              className="book-icon"
              style={{
                marginLeft: '130px',  // Adds space between the text and icon
                fontSize: '1.5rem',  // Adjusts the size of the icon
                color: 'white',
                marginTop: "4px",
                marginRight: "4px"    // Sets the color of the icon
              }}
            />
            {/* Book Icon added here */}
            LibraryXauto
          </a>
        </Link>
      </div>
      <div className='nav-right'>
        <ul className={menutoggle ? "nav-options active " : "nav-options"}>

          <li className="option" onClick={() => { closeMenu(); }}>
            <Link to='/'>
              <a href="#home">Home</a>
            </Link>
          </li>




          {
            user && user.userType == "Student" ? (
              <>
                <li className="option" onClick={() => { closeMenu(); }}>
                  <Link to='/books'>
                    <a href="#books">Books</a>
                  </Link>
                </li>
                <li className="option" onClick={() => { closeMenu(); }}>
                  <Link to='/NotesSection'>
                    <a href="#NotesSection">Notes</a>
                  </Link>
                </li>
              </>

            ) : user && user.userType == "Teacher" ? (

              <li className='option' onClick={() => { closeMenu(); }}>
                <Link to='/dashboard@member'>
                  <a href="#dashboard@member">Dashboard</a>
                </Link>
              </li>
            ) : (
              <>
                <li className="option" onClick={() => { closeMenu(); }}>
                  <Link to='/signin'>
                    <a href="#books">Books</a>
                  </Link>
                </li>
                <li className="option" onClick={() => { closeMenu(); }}>
                  <Link to='/signin'>
                    <a href="#NotesSection">Notes</a>
                  </Link>
                </li>

              </>
            )



          }

          {
            memberDetails ? null : (
              <li className="option" onClick={() => { closeMenu(); }}>
                <Link to='/signin'>
                  <a href='signin'>Login</a>
                </Link>
              </li>

            )
          }
        </ul>


        {/* profile icon */}
        {
          memberDetails ? (


            <div className='profile-notification'>
              <Link to='/dashboard@member'>
                <div className='profile'>
                  {memberDetails?.userFullName.split(" ").map(word => word.charAt(0)).join("")}
                </div>
              </Link>
              <div>
                {
                  memberDetails?.userType == "Student" ?(
                    <IoIosNotifications  color='white' size={30} className='notification-icon' onClick={() => setModalShow(true)} />
                  ) : null
                }
                
              </div>

            </div>
          ) : null
        }






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
