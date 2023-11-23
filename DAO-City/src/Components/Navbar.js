// src/components/Navbar.js
import React from 'react';
import { connectWallet } from './ConnectWallet';
import { userSession } from './UserSession';

const Navbar = () => {
  const auth=()=>{
    if(userSession.isUserSignedIn()){
      userSession.signUserOut();
      window.location.reload();
    }
    else{connectWallet();}
  }
  return (
    <nav>
      <div className="navbar-left">
        <span>DAO CITY</span>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Contact</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="navbar-right">
        <button onClick={()=>auth()}>{userSession.isUserSignedIn()?'Log Out':'Connect Wallet'}</button>
      </div>
    </nav>
  );
};

export default Navbar;
