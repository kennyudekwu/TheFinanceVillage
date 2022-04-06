import React from 'react';
import { Link, NavLink, withRouter } from "react-router-dom";
import logo from '../Img/logo.svg'

const Navbar = () => {
  return (
  <nav className="mainNav navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <i className="topNav">
    <NavLink exact to ="/" className="navbar-brand" href="#">
      <img src={logo} alt="logo" className='logoNav'/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    </i>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink exact to="aboutus" className="nav-link" href="#">About Us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="testimonials" className="nav-link" href="#">Testimonials</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="faqs" className="nav-link">FAQS</NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="blog" className="nav-link">Blog</NavLink>
        </li>

        <li className="nav-item">
          <Link exact to="login"><button className="btn login nav-link authLink" type="submit">Log In</button></Link>
        </li>
        <li className="nav-item">
          <Link exact to ="joinus"><button className="btn signup nav-link authLink" type="submit">Become a Member</button></Link>
        </li>
      </ul>
      {/* <div className="">
        <button className="btn login" type="submit">Log In</button> <br />
        <button className="btn signup" type="submit">Become a Member</button>
      </div> */}
    </div>
  </div>
</nav>
  );
};

export default withRouter(Navbar);
