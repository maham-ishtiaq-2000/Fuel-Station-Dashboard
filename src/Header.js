import React from 'react';
import './Header.css';

const Header = () =>{
    const handleSignOut = (e) =>{
        e.preventDefault()
        console.log("sign out page")
        window.location="/"
    }
    return(
        <>
        <div className='headerMainDiv'>
             <button onClick={handleSignOut}>
                SignOut
             </button>
        </div>
        </>
    )
}

export default Header;