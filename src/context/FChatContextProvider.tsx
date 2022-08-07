import React, { useState } from "react";
import FChatContext from "./FChatContext";

import firebaseConfig from '../config/firebase.config';
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


type FChatProps = {
    children: React.ReactNode
};

const FChatContextProvider = (props: FChatProps) => {

    initializeApp (firebaseConfig);

    const [user, setUser]               = useState <Object> ({});
    const [userData, setUserData]       = useState <Object> ({});
    const [loadingUser, setLoadingUser] = useState <boolean> (true);
    const [errorUser, setErrorUser]     = useState <Object> ({});

    const auth = getAuth ();

    auth.onAuthStateChanged ( (user) => {

        if (user) {
            setUser ({
                uid: user.uid,    
                username: user.email,
                avatar: user.photoURL,
                name: user.displayName
            });
        } else setUser ({});

        setLoadingUser (false);
    });
  
    const loginWithGoogle = () => {
    
        const provider = new GoogleAuthProvider ();
        signInWithPopup (auth, provider).then ((result) => {
            
            //const credential = GoogleAuthProvider.credentialFromResult (result);
            //const token      = credential?.accessToken;
            //const user       = result.user;

        }).catch ((error) => {
            
            //const errorCode    = error.code;
            //const errorMessage = error.message;
            //const email        = error.customData.email;
            //const credential   = GoogleAuthProvider.credentialFromError (error);
            
            setErrorUser (error);
            setLoadingUser (false);
        });
    }


    const loginWithFacebook = () => {

        const provider = new FacebookAuthProvider ();
        signInWithPopup(auth, provider).then((result) => {
        
            //const credential = FacebookAuthProvider.credentialFromResult(result);
            //const token      = credential?.accessToken;
            //const user       = result.user;

        
        }).catch ((error) => {
        
            //const errorCode    = error.code;
            //const errorMessage = error.message;
            //const email        = error.customData.email;
            //const credential   = FacebookAuthProvider.credentialFromError(error);

            setErrorUser (error);
            setLoadingUser (false);
        });
    }

    /*
    const [u, l, e] = useAuthState (firebase.auth ());
    useEffect ( () => {
        
        if (u !== undefined && u !== null) {

            firebase.firestore ().collection ("users").doc (u.uid).get ().then ( (docData) => {

                if (docData.data ()) setUserData (docData.data ());
                
                setUser (u);
                setLoadingUser (l);
                setErrorUser (e);
            });
        } else {
            setUser (u);
            setUserData (null);
            setLoadingUser (l);
            setErrorUser (e);
        }
    }, [u, l, e]);
    */
    
    return (
        <FChatContext.Provider value={{ user, userData, loadingUser, errorUser, loginWithGoogle, loginWithFacebook }}>{props.children}</FChatContext.Provider>
    );
}

export default FChatContextProvider;