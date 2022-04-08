import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import logo from '../Img/logo.svg'
// import eye from '../Img/Eye.svg'
import '../CSS/auth.css'
import { Link } from 'react-router-dom';



const login = () => {
  return (
      <div className='login'>
        <Navbar />
        <center>
           <div className='loginCard'>
            <div className="card innerCard">
                <center><img src={logo} alt="logo" className='logo'/></center>
                <p className='enterCred'>Enter your credentials to sign in</p>

                <input type="text" className="form-control loginInput" placeholder='Email Address'/>
                <input type="password" className="form-control loginInput mt-4" placeholder='Password'/>
                {/* <img className='viewPass' src={eye} alt="view password" /> */}
                <Link exact to="resetone" className='forgotPass'>Forgot Password ? </Link>

                <a href="../express/public/index"><button className='btn loginBtn'> Proceed </button></a>

                <p className='policy'>I have read, understood and I agree to Finance Villlage <Link exact to="">Privacy Policy </Link> and <Link exact to=""> Terms and conditions</Link> </p>
            </div>

            <div className="card lowerCard">
               <p>Not registered yet? <Link exact to="joinus" className='createAcc'>Create an Account</Link></p>   
            </div>
        </div> 
        </center>
        <Footer/>
    </div>
  )
}

export default login