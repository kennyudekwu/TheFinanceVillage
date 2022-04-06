import React from 'react'
import Sidebar from '../../Components/Sidebar'
import founder from '../../Img/founder.png'
import danger from '../../Img/danger.svg'
import success from '../../Img/success.svg'
import '../../CSS/dashboard.css'

const dashboard = () => {
  return (
    <div>
        <Sidebar />
        <div className="dashboard">
        <div className="container">
          <h3>Hi <span className='userName'>Uche,</span> <br /> Welcome to the finance village</h3>

          <img src={founder} alt="" className='founder'/>

          <p className='pb-4'>As a premium member of the finance village you’ll have acces to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dui dolor ultrices et, amet, dictum. Pharetra massa elementum odio eleifend. Nulla duis nunc, bibendum sollicitudin eget mauris nisi. Quis in ipsum ac lacinia faucibus viverra venenatis ac. </p>

          <div className="card red">
            <img src={danger} alt="" className='icon'/>
            <span className='cardText'>
              Please fill in your bank account details on the settings page. We need this information to pay your referral bonus
            </span>
          </div>

          <div className="card red">
            <img src={danger} alt="" className='icon'/>
            <span className='cardText'>
            Please fill in your address details on the settings page. We need this information to send your Personal Finance Journal
            </span>
          </div>

          <div className="card green">
            <img src={success} alt="" className='icon'/>
            <span className='cardText'>
             Click here to join the telegram group 
            </span>   
          </div>
        </div>
        </div>
    </div>
  )
}

export default dashboard