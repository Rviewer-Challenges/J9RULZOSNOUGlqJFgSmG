import React from 'react'

const FChatContext = React.createContext <{
    user: Object,
    userData: Object,
    loadingUser: Boolean,
    errorUser: Object,
    loginWithGoogle: Function,
    loginWithFacebook: Function
}> ({
    user: {},
    userData: {},
    loadingUser: true,
    errorUser: {},
    loginWithGoogle: () => {},
    loginWithFacebook: () => {}
});

export default FChatContext;