import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import FChatContext from '../context/FChatContext'

export const Login = () => {
  
  const {userData, loadingUser, loginWithGoogle, loginWithFacebook} = useContext (FChatContext);  

  if (userData) return <Navigate to="/chat" replace />;

  return (
    <section className="login my-3">
      <div className="container-xl my-3">
        {
          loadingUser && (
            <div className="row">
              <div className="col text-center h3 d-flex align-items-center justify-content-center text-primary py-5">
                  <i className='fa fa-spinner fa-spin fa-2x ms-3' />
              </div>
            </div>
          )
        }
        {
          ! loadingUser && (
            <>
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
            </>
          )
        }  
      </div>
    </section>
  )
}
