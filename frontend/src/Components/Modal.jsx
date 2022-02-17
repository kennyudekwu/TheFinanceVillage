import React from 'react'
import state1 from '../Img/state_modal.svg'
import state2 from '../Img/state2_modal.svg'
import EmailConfirmation from '../Components/EmailConfirmation'

const Modal = () => {
    function tabs() {
        if (document.getElementById('tabOne')) {

            if (document.getElementById('tabOne').style.display == 'none') {
                document.getElementById('tabOne').style.display = 'flex';
                document.getElementById('tabTwo').style.display = 'none';
            }
            else {
                document.getElementById('tabOne').style.display = 'none';
                document.getElementById('tabTwo').style.display = 'flex';
            }
        }
}
  return (
    <div>
        <EmailConfirmation />
        <div className="modal signupModal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
        <div className="modalHeader">
        <b type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">X</span>
        </b> <br />
        <h5 className="modal-title" id="exampleModalLabel">Create a free account</h5>
        
        </div>
        <div className="modal-body">
            <form action="" id='regForm'>
                <div className="row tabOne" id='tabOne'>
                    <img src={state1} alt="" onClick={tabs}/>
                    <div className="modalCol col-6">
                        <label htmlFor="firstname">FirstName</label>
                        <input type="text" placeholder='Uche' className='form-control' />
                    </div>
                    <div className="modalCol col-6">
                        <label htmlFor="lastname">LastName</label>
                        <input type="text" placeholder='Aguocha' className='form-control' />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="email">Email</label>
                        <input type="mail" placeholder='ucheaguocha@gmail.com' className='form-control' />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="phone" placeholder='08023456789' className="form-control" />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="country">Country</label>
                        <select name="" id="" className='form-control'>
                            <option value="">Nigeria</option>
                            <option value="">Ghana</option>
                            <option value="">South Africa</option>
                            <option value="">Kenya</option>
                            <option value="">Niger</option>
                        </select>
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="referral">Referral Code</label>
                        <input type="text" placeholder='KOSI67' className="form-control" />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='*********' className="form-control" />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" placeholder='*********' className="form-control" />   
                    </div>
                </div>

                <div className="row tabTwo" id='tabTwo'>
                    <img src={state2} alt="" onClick={tabs}/>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" placeholder='12 May 1345' className='form-control' />
                    </div>
                    <div className="modalCol col-12 col-lg-6">
                        <label htmlFor="occupation">Occupation</label>
                        <input type="text" placeholder='Teacher' className="form-control" />
                    </div>
                    {/* <a className='btn continue' type='submit'>Continue</a> */}
                </div>
                <a className='btn continue' type="submit" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModalCenter">Continue</a>
            </form>

        </div>
        </div>
        </div>
        </div>

    </div>
  )
}

export default Modal