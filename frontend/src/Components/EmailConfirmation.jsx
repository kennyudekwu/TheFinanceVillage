import React from 'react'
import emailConfrimed from '../Img/emailConfirmed.svg'

const EmailConfirmation = () => {
  return (
    <div>
<div className="modal signupModal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content bg-white">
      <div className="modalHeader">
        <b type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">X</span>
        </b>
      </div>  
        <center>
          <img src={emailConfrimed} alt="" className='emailConfirmed'/>
          <div className="modal-body">
              <h5>Confirm your email address</h5>
              <p>A confirmation email has been sent to your inbox in order to finish setting up your account.</p>
          </div>
        </center>
        <button className='btn continue' type="submit">Continue</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default EmailConfirmation