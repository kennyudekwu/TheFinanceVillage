import React from 'react'
import passConfirmed from '../Img/passconfirmed.svg'
import { Link } from 'react-router-dom';


const PasswordConfirmation = () => {
  return (
    <div>
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
        <Link to="resettwo"> <button className='btn continue' type="submit" data-dismiss="modal" aria-label="Close">Continue</button> </Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default PasswordConfirmation