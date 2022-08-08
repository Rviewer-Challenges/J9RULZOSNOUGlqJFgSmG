import React from 'react'
import { FChatContextInterface } from '../types/FChatContextInterface';

const FChatContext = React.createContext <FChatContextInterface> ({
    userData: null,
    loadingUser: true,
    errorUser: null,
    app: undefined,
    loginWithGoogle: () => {},
    loginWithFacebook: () => {},
    logout: () => {},
});

export default FChatContext;