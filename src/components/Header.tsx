import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import FChatContext from '../context/FChatContext';

export const Header = () => {

    const {userData, loadingUser, logout} = useContext (FChatContext);

    return (
        <header id="header" className="header bg-primary text-white py-4" style={{height: '80px'}}>
            {
                ! loadingUser && (

                    <div className="container ">
                        <div className="row align-items-center">
                            <div className="col-4 text-start">
                                <span className="brand">Firebase Chat</span>
                            </div>
                            <div className="col-4 text-center">
                                <nav className="d-flex justify-content-around">
                                    {
                                        userData && (
                                            <>
                                                <NavLink to="/chat" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>Chat</NavLink>
                                                <NavLink to="/profile" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>Perfil</NavLink>
                                            </>
                                        )
                                    }
                                    {
                                        ! userData && (
                                            <NavLink to="/login" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>Login</NavLink>
                                        )
                                    }                        
                                    <NavLink to="/about" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>About</NavLink>
                                </nav>
                            </div>
                            <div className="col-4 text-end">
                                { 
                                    userData && (
                                        <button className='btn btn-sm btn-light' onClick={() => logout()}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                                    )
                                }
                            </div>
                        </div>  
                    </div>
                )
            }
        </header>
    )
}
