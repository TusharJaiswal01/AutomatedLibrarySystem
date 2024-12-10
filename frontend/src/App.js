import React from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import Signin from './Pages/Signin';
import MemberDashboard from './Pages/Dashboard/MemberDashboard/MemberDashboard.js';
import Allbooks from './Pages/Allbooks';
import Header from './Components/Header';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.js';
import Request from './Pages/Dashboard/AdminDashboard/Components/Request.js';
import LandingPage from "./Components/Home/LandingPage.js";
import About from "./Components/Home/About.js";
import Home from "./Components/Home/Home.js";
import ContactUs from "./Components/Home/ContactUs.js";
import Footer from "./Components/Home/Footer.js";
import NotesSection from "./Pages/NotesSection.js";

function App() {
  // Check if the user is logged in by getting user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Adjust this to how you store user info
  
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          {/* Home route */}
          <Route exact path='/'>
            <Home />
            <About />
            <ContactUs />
            <Footer />
          </Route>

          {/* Signin route */}
          <Route exact path='/signin'>
            {user 
              ? (user.isAdmin 
                ? <Redirect to='/dashboard@admin' /> 
                : <Redirect to='/dashboard@member' />) 
              : <Signin />}  {/* If no user is logged in, show Signin */}
          </Route>

          {/* Member Dashboard */}
          <Route exact path='/dashboard@member'>
            {user && user.isAdmin === false ? <MemberDashboard /> : <Redirect to='/signin' />} {/* Redirect to signin if not logged in */}
          </Route>

          {/* Admin Dashboard */}
          <Route exact path='/dashboard@admin'>
            {user && user.isAdmin === true ? <AdminDashboard /> : <Redirect to='/signin' />} {/* Redirect to signin if not logged in */}
          </Route>

          {/* Allbooks route - only show to non-admins */}
          <Route exact path='/books'>
            {user && !user.isAdmin ? <Allbooks /> : <Redirect to='/' />} {/* Redirect to homepage if user is admin */}
          </Route>
          <Route exact path='/NotesSection'>
            {user && !user.isAdmin ? <NotesSection /> : <Redirect to='/' />} {/* Redirect to homepage if user is admin */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
