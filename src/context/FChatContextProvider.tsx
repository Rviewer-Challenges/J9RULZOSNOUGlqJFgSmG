import React, { useEffect, useState } from "react";
import FChatContext from "./FChatContext";

import firebaseConfig from '../config/firebase.config';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


type FChatProps = {
    children: React.ReactNode
};

const FChatContextProvider = (props: FChatProps) => {
    
    const app      = initializeApp (firebaseConfig);
    const database = getDatabase(app);


    const auth = getAuth ();

    const [userData, setUserData]       = useState <{uid: string, email: string, username: string, name: string, avatar: string}> ({uid: '', email: '', username: '', name: '', avatar: ''});
    const [loadingUser, setLoadingUser] = useState <boolean> (true);
    const [errorUser, setErrorUser]     = useState <Object> ({});

    useEffect ( () => {

        auth.onAuthStateChanged ( (user) => {
            
            if (user) {
                
                setUserData ({
                    uid: user.uid,    
                    email: user.email ? user.email : '',
                    username: user.email ? user.email: '',
                    avatar: user.photoURL ? user.photoURL: '',
                    name: user.displayName ? user.displayName: ''
                });
                setErrorUser ({});
            } else {
                setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
            }
            setLoadingUser (false);
    
        });
    }, []);
    
    useEffect (() => {

        console.log (userData);
        // TODO: Escribir a base de datos.
    }, [userData])
    

    
  
    const loginWithGoogle = () => {
    
        setLoadingUser (true);

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
            setLoadingUser (false);
        });
    }


    const loginWithFacebook = () => {

        setLoadingUser (false);

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

            setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
            setErrorUser (error);
            setLoadingUser (false);
        });
    }


    const logout = () => {

        setLoadingUser (true);
        signOut (auth).then ( () => {

        }).catch ( (error) => {

            setUserData ({uid: '', email: '', username: '', name: '', avatar: ''});
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
        <FChatContext.Provider value={{userData, loadingUser, errorUser, loginWithGoogle, loginWithFacebook, logout }}>{props.children}</FChatContext.Provider>
    );
}

export default FChatContextProvider;