import React, { useContext } from 'react'
import FChatContext from '../context/FChatContext'

export const Login = () => {
  
  const {loginWithGoogle, loginWithFacebook} = useContext (FChatContext);  

  return (
    <div className="login">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12 text-center text-primary">
            <h2 className=''>Inicia sesión</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center border border-primary rounded-3 my-3 py-5 text-primary d-flex align-items-center justify-content-center item" onClick={() => loginWithGoogle ()}>
            <i className="fa-brands fa-google fa-2x me-2"></i> Google
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center border border-primary rounded-3 my-3 py-5 text-primary d-flex align-items-center justify-content-center item" onClick={() => loginWithFacebook ()}>
            <i className="fa-brands fa-facebook fa-2x me-2"></i> Facebook
          </div>
        </div>
      </div>
    </div>
  )
}
