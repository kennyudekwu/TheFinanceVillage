import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import tHeader from '../Img/testimonialHeader.png'
import kenny from '../Img/kenny.png'
import g5 from '../Img/Group5.png'
import { Link } from 'react-router-dom';
import '../CSS/testimonials.css'


const testimonials = () => {
  return (
    <div className='testimonial'>
      <Navbar />
      <div className='container align-content-center'>
        <div className="row theaderRow">
          <div className="col-12 col-md-6 align-self-center theadText">
            <h1>Stories from people like you.</h1>
            <p>Stories of happy people that the Finance Villlage has helped or is helping save for what truly matters to them.</p>
          </div>
          <div className="col-12 col-md-6">
            <img className='theaderImg' src={tHeader} alt="testimonial_Header" />
          </div>
        </div>

        <h2 className="th2Border">Recently Verified Customers</h2>

        <div className="row cardRow">
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="w-100 my-4"></div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 card tCard">
            <div className="container">
              <img src={kenny} alt="kosi" className='customerImg py-3'/>
              <h5>Kosi Nwafor</h5>
              <h6><i>Student</i></h6>
              <p className='py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. ultrices et, amet, dictum. Pharetra m....</p>
              <p className='tDate'>Friday, 27th of August 2021 </p>
            </div>
          </div>       
        </div>
      </div>

      
      <div className="sec8 row">
          <div className="col-12 col-md-6">
            <img src={g5} alt="group5" className='imgG5'/>
          </div>
          <div className="col-12 col-md-6 alignLeft align-self-center">
            <h1>Our free financial advice   
              for you right now?</h1>
              <p>Join the Finance Village to gain the knowledge you need to manage and
              grow your wealth.</p>
              <Link to="joinus"><button className="btn btnJoin">Join the Village</button></Link> 
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default testimonials