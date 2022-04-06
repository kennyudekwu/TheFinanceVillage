import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import logo from '../Img/logo.svg'
import passConfirmed from '../Img/passconfirmed.svg'
import '../CSS/auth.css'
import { Link } from 'react-router-dom';


const resetpassOne = () => {
  function tabs() {
            document.getElementById('resetOne').style.display = 'none';
            document.getElementById('resetTwo').style.display = 'inherit';
}
  return (
      <div className='login'>
        <div className="modal signupModal resetModal fade text-dark" id="passModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-white">
          <div className="modalHeader">
          <b type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">X</span>
          </b>
          </div>  
          <center>
            <img src={passConfirmed} alt="" className='emailConfirmed'/>
            <div className="modal-body">
                <h5>Check your inbox</h5>
                <p>A link has been sent to emm*****@gmail.com in order to reset your password</p>
            </div>
          </center>
          <Link to="resettwo"> <button className='btn continue' type="submit" data-dismiss="modal" aria-label="Close" onClick={tabs}>Continue</button> </Link>
          </div>
          </div>
        </div>
        <Navbar />
        {/* <PasswordConfirmation /> */}
        <center>
           <div className='resetPass' id='resetOne'>
            <div className="card innerCard pt-3">
                <center><img src={logo} alt="logo" className='logo'/></center>
                <p className='enterCred mb-4'>Enter your email and we will send you a <br /> link to reset your password</p>

                <input type="text" className="form-control loginInput" placeholder='Email Address'/>
                <br /><br />
                <button className='btn loginBtn' data-toggle="modal" data-target="#passModalCenter"> Proceed </button>
                <br /><br /><br />
            </div>
           </div> 
           <div className='resetPass hide' id='resetTwo'>
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

export default resetpassOne