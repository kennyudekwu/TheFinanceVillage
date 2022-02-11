import React from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import uchefounder from '../Img/theucheaguocha.svg'
import coin1 from '../Img/coin1.svg'
import coin2 from '../Img/coin2.svg'
import '../CSS/aboutus.css'

const aboutus = () => {
  return (
    <div className='aboutus'>
      <Navbar />
      <div className='about container'>
        <section className="one">
          <img className='coin2' src={coin2} alt="coin2" />
            <h1 className='aboutH1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim nisl vestibulum amet. </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. Pharetra massa elementum odio eleifend. Nulla duis nunc, bibendum sollicitudin eget mauris nisi. Quis in ipsum ac lacinia faucibus viverra venenatis ac. Enim sit quis nibh fusce ac sit. Etiam nulla volutpat tellus elit volutpat eu etiam.</p>
          <img className='coin1' src={coin1} alt="coin1" />
        </section>
       
        <section className="two">
          <h2 className='aboutH2'>Lorem ipsum dolor sit amet, consectetur</h2>

          <div className="row">
            <div className="col-12 col-lg-6">
              <img className='founder' src={uchefounder} alt="ucheaguocha_founder" />
            </div>
            <div className="col-12 col-lg-6 paragraph">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. Pharetra massa elementum odio eleifend. Nulla duis nunc, bibendum sollicitudin eget mauris nisi. Quis in ipsum ac lacinia faucibus viverra venenatis ac. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. Pharetra massa elementum odio eleifend. Nulla duis nunc, bibendum sollicitudin eget mauris nisi. Quis in ipsum ac lacinia faucibus viverra venenatis ac. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. Pharetra massa elementum odio eleifend. Nulla duis nunc, bibendum sollicitudin eget mauris nisi. Quis in ipsum ac lacinia faucibus viverra venenatis ac. </p>
            </div>
          </div>
        </section>
          
      </div>
      <Footer />
    </div>  
  )
}

export default aboutus;