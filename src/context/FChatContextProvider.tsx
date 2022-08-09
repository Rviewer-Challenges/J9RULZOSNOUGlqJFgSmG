import { useEffect, useState } from "react";
import FChatContext from "./FChatContext";

import firebaseConfig from '../config/firebase.config';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { userDataInterface } from "../types/userDataInterface";
import { FChatProps } from "../types/FChatProps";


const FChatContextProvider = (props: FChatProps) => {
    
    const app  = initializeApp (firebaseConfig);
    
    const [userData, setUserData]       = useState <userDataInterface | null> (null);
    const [loadingUser, setLoadingUser] = useState <boolean> (true);
    const [errorUser, setErrorUser]     = useState <object | null> (null);
    
    useEffect ( () => {
        
        const auth = getAuth ();
        auth.onAuthStateChanged ( (user) => {

            if (user) {
                
                setUserData ({
                    uid: user.uid,    
                    email: user.email ? user.email : '',
                    username: user.email ? user.email: '',
                    avatar: user.photoURL ? user.photoURL: '',
                    name: user.displayName ? user.displayName: ''
                });
                setErrorUser (null);
            } else {
                setUserData (null);
            }
            setLoadingUser (false);
    
        });
    }, []);
    
    
    useEffect (() => {

        const database = getDatabase (app);

        if (userData) set (ref (database, 'users/' + userData.uid), userData);

    }, [userData, app])
    

    
  
    const loginWithGoogle = () => {
    
        const auth = getAuth ();

        const provider = new GoogleAuthProvider ();
        signInWithPopup (auth, provider).then ((result) => {
            
            /*
            setUserData  ({
                uid: result.user.uid ? result.user.uid : '',
                email: result.user.email ? result.user.email : '',
                username: result.user.email ? result.user.email : '',
                avatar: result.user.photoURL ? result.user.photoURL : '',
                name: result.user.displayName ? result.user.displayName : ''
            });
            */
            //setLoadingUser (false);
            //const credential = GoogleAuthProvider.credentialFromResult (result);
            //const token      = credential?.accessToken;
            //const user       = result.user;

        }).catch ((error) => {
            
            //const errorCode    = error.code;
            //const errorMessage = error.message;
            //const email        = error.customData.email;
            //const credential   = GoogleAuthProvider.credentialFromError (error);
            
            setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
            setErrorUser (error);
        });
    }


    const loginWithFacebook = () => {

        const auth = getAuth ();
        
        const provider = new FacebookAuthProvider ();
        signInWithPopup (auth, provider).then((result) => {
        
            console.log (result.user);
            //const credential = FacebookAuthProvider.credentialFromResult(result);
            //const token      = credential?.accessToken;
            //const user       = result.user;

        
        }).catch ((error) => {
        
            //const errorCode    = error.code;
            //const errorMessage = error.message;
            //const email        = error.customData.email;
            //const credential   = FacebookAuthProvider.credentialFromError(error);

            setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
            setErrorUser (error);
        });
    }


    const logout = () => {

        const auth = getAuth ();

        signOut (auth).then ( () => {

        }).catch ( (error) => {

            setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
            setErrorUser (error);
        });
    }
    
    
    return (
        <FChatContext.Provider value={{userData, loadingUser, errorUser, loginWithGoogle, loginWithFacebook, logout, app }}>{props.children}</FChatContext.Provider>
    );
}

export default FChatContextProvider;