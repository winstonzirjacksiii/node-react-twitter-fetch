import React from 'react';
import { auth } from '../firebase';

const CurrentUser = ({ user }) => {
  return (
    <div className="m-current-user">
      <img className="m-current-user--photo"
           src={ user.photoURL }
           alt={ user.displayName } />

      <div className="m-current-user--id">
        <h3>{ user.displayName }</h3>
        <p>{ user.email }</p>
        <button onClick={() => auth.signOut() }>Sign Out</button>
      </div>
    </div>
  );
};

export default CurrentUser;