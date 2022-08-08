import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import FChatContext from '../context/FChatContext';

export const Header = () => {

    const {logout} = useContext (FChatContext);

    return (
        <div className="header">
            <nav className="navbar navbar-light bg-info text-white">
                <div className="container-fluid">
                    <div className="text-start">
                        <span className="navbar-brand text-white">Chat</span>
                    </div>
                    <div className='text-center'>
                        <NavLink to="/chat" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>Chat</NavLink>
                        <NavLink to="/login" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>Login</NavLink>
                        <NavLink to="/about" className={({isActive}) => ('nav-link ' + (isActive ? "active fw-bold" : ''))}>About</NavLink>
                    </div>
                    <div className="text-end" >
                        <button className='btn btn-sm btn-danger' onClick={() => logout()}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
