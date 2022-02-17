import React from 'react';
import logo from '../Img/logo.svg'
import fb from '../Img/facebook.svg'
import ig from '../Img/instagram.svg'
import tg from '../Img/telegram.svg'
import wp from '../Img/whatsapp.svg'
import ln from '../Img/linkedin.svg'
import call from '../Img/call.svg'
import mail from '../Img/mail.svg'
import inputIcon from '../Img/inputMailicon.svg'


const Footer = () => {
  return (
    <footer>
    <div className="upFooter mt-5 container">
    <div className="row">
      <div className="col-12 col-sm-6 alignLeft">
        <h2 className='newsletter'>Newsletter</h2>
        <p>Be the first one to know about discounts, offers and events. Unsubscribe whenever you like.</p>
      </div>
      <div className="col-12 col-sm-6">
        <form action="" method="post">
          <img src={inputIcon} alt="inputIcon" className='mailInputicon'/>
          <input type="email" name="" id="" placeholder='Enter your email' className='mailInput'/>
          <button className='Submit btn btnInput'>Submit</button>
        </form>
      </div>
    </div>
    </div>

      <div className="container">
      <div className="row justify-content-center">
      <div className="col-12">
      <hr className='bg-danger align-self-center'/>
      </div>
      </div>
      </div>

      <div className="lowFooter container">
        <img src={logo} alt="logo" className='indexLogo'/>
        <p className='lowFooter_paragraph'>We ara a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud equip ex ea commodo consequat... Read More</p>
        <div className='logos'>
          <a href=""><img src={fb} alt="facebook"/></a>
          <a href=""><img src={tg} alt="telegram" className='px-4'/></a>
          <a href=""><img src={wp} alt="whatsapp" /></a>
          <a href=""><img src={ig} alt="instagram" className='px-4'/></a>
          <a href=""><img src={ln} alt="linkedin" /></a>
        </div>
        <div className="lFootrow row">
          <div className="col-6 col-md-3">
            <img src={call} alt="call_icon" /> 
            <p className='footIcon'> Have a question? <br />
            <a href="tel:+234 703 491 4491">+234 703 491 4491</a></p>
          </div>
          <div className="col-6 col-md-3">
            <img src={mail} alt="mail_icon" /> 
            <p className='footIcon'>Contact us at <br /> 
            <a href="mailto:thefinancevillage@gmail.com"> thefinancevillage@gmail.com </a>
            </p>
          </div>
          <div className="col-0 col-md-3"></div>
          <div className="col-12 col-md-3">
            <br />
            <p className='footerRights'>© 2000-2021, All Rights Reserved</p>
          </div>
        </div>
      </div> 
    </footer>   
  )
}

export default Footer;
