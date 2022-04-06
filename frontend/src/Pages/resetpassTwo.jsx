import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import logo from '../Img/logo.svg'
import '../CSS/auth.css'
import { Link } from 'react-router-dom';



const resetpassTwo = () => {
  return (
      <div className='login'>
        <Navbar />
        <center>
           <div className='resetPass'>
            <div className="card innerCard pt-3">
                <center><img src={logo} alt="logo" className='logo'/></center>
                <p className='enterCred mb-4'>Reset the password for your account, <br /> this will be used for logging in.</p>

                <input type="password" className="form-control loginInput" placeholder='Enter your new password'/>
                <br />
                <input type="password" className="form-control loginInput" placeholder='Confirm new password'/>
                <br /><br />
                <Link exact to="dashboard"><button className='btn loginBtn'> Proceed </button></Link>
                <br /><br /><br />
            </div>
        </div> 
        </center>
        <Footer/>
    </div>
  )
}

export default resetpassTwo