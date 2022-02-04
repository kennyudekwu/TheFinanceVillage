import React from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import group from '../Img/Group.png'
import kenny from '../Img/kenny.png'
import uche from '../Img/uche.png'
import kosi from '../Img/kosi.png'
import g1 from '../Img/Group1.png'
import g2 from '../Img/Group2.png'
import g3 from '../Img/Group3.png'
import g4 from '../Img/Group4.png'
import g5 from '../Img/Group5.png'
import book from '../Img/book.png'
import founder from '../Img/founder.png'
import test from '../Img/testimonial.png'
import chat from '../Img/chat.png'
import '../CSS/component.css'
import '../CSS/index.css'
import { Link } from 'react-router-dom';

const index = () => {
  return <div className='index'>
      <Navbar />
      <div className="sec1 container">
        <div className="row">
          <div className="col align-self-center">
            <div className="alignLeft">
            <h1 className='mainHeader'>
              <span className='pColor'>Learn</span><span> to make the right </span><span className='sColor'> money moves</span>
            </h1>
            <p>
              The FINANCE VILLAGE is a private community of individuals set on the journey to learn all about PERSONAL FINANCE.
            </p>
            <Link to="joinus"><button className="btn priBtn">Join the village</button></Link> 
            </div>
          </div>
          <div className="col-md-6">
            <img src={group} alt="group" className='imgGroup'/>
          </div>
        </div>
      </div>


      <div className="sec2">
        <div className="sect2">
          <div className="container">
            <h1 className='sec2Header'>If you are...</h1>
              <div className="row  justify-content-start">
                <div className="col col-md-4">
                  <img src={kosi} alt="kosi" className='dummyUser'/>
                </div>
                <div className='sec2Left col col-md-4'>
                  <p className='innerHead'>like Kosi</p> 
                  <p>pen to admitting that some of the most important things you want to achieve in life depend on the income you earn and your current income will not get you there.</p>
                </div>
              </div>
              <div className="row my-5 justify-content-end">
                <div className="sec2Left col col-md-4">
                  <p className='innerHead'>or like Uche</p>
                  <p>pen to admitting that some of the most important things you want to achieve in life depend on the income you earn and your current income will not get you there.</p>
                </div>
                <div className="col col-md-4">
                  <img src={uche} alt="uche" className='dummyUser'/>
                </div>
              </div>
              <div className="row  justify-content-start">  
                <div className="col col-md-4">
                  <img src={kenny} alt="kenny" className='dummyUser'/>
                </div>
                <div className="sec2Left col col-md-4">
                  <p className='innerHead'>or like Kenny</p>
                  <p> pen to admitting that some of the most important things you want to achieve in life depend on the income you earn and your current income will not get you there.</p>
                </div>   
              </div>
            </div>
          </div> 
        </div>
     

        <div className="sec3">
          <div className="container">
            <div className="row">
              <div className="secText">
                <h2>You should really check out the Finance Village</h2>
                <h4 className='sec3H4'>Here’s how we help you </h4>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <img src={g1} alt="group1" className='groupAssets' />
                <p className='subHead'>Courses taught by experts</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor neque, gravida sem urna eget iaculis</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
              <img src={g2} alt="group2" className='groupAssets'/>
                <p className='subHead'>Community of like-minded individuals</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor neque, gravida sem urna eget iaculis</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
              <img src={g3} alt="group3" className='groupAssets'/>
                <p className='subHead'>Access to Exclusive Events & Webinars</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor neque, gravida sem urna eget iaculis</p>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
              <img src={g4} alt="group4" className='groupAssets'/>
                <p className='subHead'>Helpful Resources</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor neque, gravida sem urna eget iaculis</p>
              </div>
            </div>
          </div>
        </div>


        <div className="sec4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <img src={book} alt="e-book" className='imgBook'/>
              </div>
              <div className="col-12 col-md-6 align-self-center alignLeft">
                <h2>Grab a <span className="sColor">free</span> copy of our e-book</h2> 
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur rutrum odio id id porttitor blandit nec turpis lorem. Nunc eu ipsum ut dui vitae id neque eu. Enim elementum ipsum, egestas porttitor sociis sit. Leo mauris purus nisl gravida mauris, mi, iaculis dictum.
                </p>
                <button className='btn secBtn'>Get your copy</button>
              </div>
            </div>
          </div>
        </div>


        <div className="sec5 mb-5">
          <div className="container">
              <h3>A message from the founder</h3>
              <img src={founder} alt="founder: Uche Ugocha" className='pt-5 imgFounder'/>
          </div>
        </div>


        <div className="sec6 row no-gutters">
              <div className="col-12 col-md-6">
                <img src={test} alt="testimonial" className='imgTest'/>
              </div>
              <div className="sect6 col-12 col-md-6">
                <blockquote className=''>
                  “Growing up, I learnt a lot on budgeting from my dad. I still struggled with dominating my finances as a young adult. Thanks to timely and helpful articles from Uche (of Finance Village), I am currently planning better towards owning a business and going on a dream vacation.“
                </blockquote>
                <div className="readMore">
                  <p className='readStudent'>-Kosi Nwafor (Student)</p>
                  <p className='readStories'>READ MORE STORIES</p>
                </div>
                
              </div>
        </div>


        <div className="sec7 row">
          <div className="col-12 col-md-6 alignLeft align-self-center">
              <h2>Need help getting started?</h2>
              <p>Do you have questions or need further clarifications? Send us a message on 
                whatsapp and we’ll respond as soon as we can </p>
                <button className='btn chatBtn'><a href="https://wa.me/2347034914491">Chat Now</a></button>
          </div>
          <div className="col-12 col-md-6">
              <img src={chat} alt="chat" className='imgChat'/>
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
              <button className="btn btnJoin">Join the Village</button>
          </div>
        </div>

        <Footer />

      </div>;
};

export default index; 