import React from 'react';
import logo from '../Img/logo.png'

const Navbar = () => {
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a class="navbar-brand" href="#">
      <img src={logo} alt="logo" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Testimonials</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">FAQS</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Blog</a>
        </li>
      </ul>
      <div className="d-flex">
        <button className="btn login btn-outline-primary" type="submit">Log In</button>
        <button className="btn signup mx-3" type="submit">Become a Member</button>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
