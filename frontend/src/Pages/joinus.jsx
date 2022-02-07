import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Accordion from '../Components/Accordion';
import freecourse from '../Img/freecourses.svg'
import freenotcourse from '../Img/freenotcourses.svg'
import freewebinar from '../Img/freewebinars.svg'
import freeresource from '../Img/freeresources.svg'
import paidcourse from '../Img/paidcourses.svg'
import paidwebinar from '../Img/paidwebinars.svg'
import paidresource from '../Img/paidresources.svg'
import '../CSS/joinus.css'
import { Link } from 'react-router-dom';


const joinus = () => {
  return (
    <div className='joinus'>
    <Navbar />
      <div className="container">
        <div className="my-5">
          <h2>Our Packages</h2>
          <p>Whether you’re still trying to decide or you are ready to kickstart your journey <br /> to financial success, we have something for you</p>
        </div>
        
        <center>
          <div className="row">
              <div className="col-12 col-md-6">
                <div class="card free">
                <div class="card-body">
                <div className="card-content">
                <h2 class="card-title">$ 0.00 <span> /year</span></h2>
                <h5>Free Membership</h5>
                <p class="card-text">All the basics to start your journey</p>
                </div>

                <div className="features">
                  <img className='joinusFeatures' src={freecourse} alt="" />
                  <img className='joinusFeatures webinarIcon' src={freewebinar} alt="" />
                  <img className='joinusFeatures' src={freenotcourse} alt="" />
                  <img className='joinusFeatures resourceIcon' src={freeresource} alt="" />
                </div>
                
                <br />
                </div>
                <Link to=""> <button href="#" class="btn signin">Choose this plan</button> </Link>
                </div>
              </div>  

              <div className="col-12 col-md-6">
                <div class="card paid">
                <div class="card-body">
                <div className="card-content">
                <h2 class="card-title">$ 50.00 <span> /year</span></h2>
                <h5>Premium Membership</h5>
                <p class="card-text">All the basics to start your journey</p>
                </div>
                <div className="features">
                  <img className='joinusFeatures' src={freecourse} alt="" />
                  <img className='joinusFeatures webinarIcon' src={paidwebinar} alt="" />
                  <img className='joinusFeatures' src={paidcourse} alt="" />
                  <img className='joinusFeatures resourceIcon' src={paidresource} alt="" />
                </div>
                
                <br />
                </div>
                <Link to=""> <button href="#" class="btn signin">Choose this plan</button> </Link>
                </div>
              </div>  
          </div>
        </center> 

          <div className='mb-5'>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className='accordion'>
            <Accordion />
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default joinus;