import React from 'react'

const FChatContext = React.createContext <{
    userData: {
        uid: string, 
        email: string, 
        username: string, 
        name: string, 
        avatar: string
    },
    loadingUser: Boolean,
    errorUser: Object,
    loginWithGoogle: Function,
    loginWithFacebook: Function
}> ({
    userData: {
        uid: '', 
        email: '', 
        username: '', 
        name: '', 
        avatar: ''
    },
    loadingUser: true,
    errorUser: {},
    loginWithGoogle: () => {},
    loginWithFacebook: () => {}
});

export default FChatContext;