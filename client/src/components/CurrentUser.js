import React from 'react';
import { auth } from '../firebase';

import '../css/CurrentUser.css';


const CurrentUser = ({ user }) => {
  return (
    <div className="m-current-user">
      <img className="m-current-user--photo"
           src={ user.photoURL }
           alt={ user.displayName } />

      <div className="m-current-user--id">
        <h3>{ user.displayName }</h3>
        <p>{ user.email }</p>
        <button className="m-btn" onClick={() => auth.signOut() }>Sign Out</button>
      </div>
    </div>
  );
};

export default CurrentUser;