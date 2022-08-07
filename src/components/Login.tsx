import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = () => {
  
  const auth = getAuth ();
  
  const loginWithGoogle = () => {
    
    const provider = new GoogleAuthProvider ();
    signInWithPopup (auth, provider).then ((result) => {
      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult (result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log (result);
      console.log (token);
      console.log (user);
    }).catch ((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log (error);
      console.log (credential);
    });
  }

  return (
    <div className="login">
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12 text-center text-primary">
            <h2 className=''>Inicia sesión</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center border border-primary rounded-3 my-3 py-5 text-primary d-flex align-items-center justify-content-center item" onClick={loginWithGoogle}>
            <i className="fa-brands fa-google fa-2x me-2"></i> Google
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center border border-primary rounded-3 my-3 py-5 text-primary d-flex align-items-center justify-content-center item">
            <i className="fa-brands fa-facebook fa-2x me-2"></i> Facebook
          </div>
        </div>
      </div>
    </div>
  )
}
