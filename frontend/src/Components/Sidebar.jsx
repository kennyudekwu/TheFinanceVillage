import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import profile from '../Img/profile-sidebar.png'
import calendar from '../Img/calendar-sidebar.png'
import book from '../Img/book-sidebar.png'
import home from '../Img/home-sidebar.png'
import note from '../Img/note-sidebar.png'
import webinars from '../Img/webinars-sidebar.png'
import setting from '../Img/setting-sidebar.png'
import logout from '../Img/logout-sidebar.png'
import profileImg from '../Img/userprofileImg.svg'

const Sidebar = () => {
  return (
  <nav className="sidebar navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <NavLink exact to ="/" className="navbar-brand navbarBrand" href="#">
      <img src={profileImg} alt="profile photo" className='profileImg'/>
      <h4 className='username'>Uche Aguocha</h4>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <img src={home} alt="home" className='sidebarIcon'/>
          <NavLink exact to="dashboard" className="nav-link" href="#">Start Here</NavLink>
        </li>
        <li className="nav-item">
          <img src={book} alt="" className='sidebarIcon'/>
          <NavLink exact to="courses" className="nav-link" href="#">Courses</NavLink>
        </li>
        <li className="nav-item">
          <img src={webinars} alt="" className='sidebarIcon'/>
          <NavLink exact to="faqs" className="nav-link">Webinars / Events</NavLink>
        </li>
        <li className="nav-item">
          <img src={note} alt="" className='sidebarIcon'/>
          <NavLink exact to="blog" className="nav-link">Resources</NavLink>
        </li>
        <li className="nav-item">
          <img src={calendar} alt="" className='sidebarIcon'/>
          <NavLink exact to="blog" className="nav-link">Calendar </NavLink>
        </li>
        <li className="nav-item">
          <img src={profile} alt="" className='sidebarIcon'/>
          <NavLink exact to="blog" className="nav-link">Referrals </NavLink>
        </li>
        <li className="nav-item">
          <img src={setting} alt="" className='sidebarIcon'/>
          <NavLink exact to="blog" className="nav-link">Settings</NavLink>
        </li>
        <li className="nav-item">
          <span className="logout">
            <img src={logout} alt="" className='sidebarIcon logoutIcon'/>
            <NavLink exact to="logout" className="nav-link">Log Out</NavLink>
          </span>
          
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default withRouter(Sidebar);
