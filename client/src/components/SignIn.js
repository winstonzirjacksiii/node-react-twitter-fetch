import React from 'react';
import { auth, googleAuthProvider } from '../firebase';

const SignIn = () => {
  return (
    <div className="m-signin">
      <button className="m-btn m-signin--btn" onClick={() => auth.signInWithPopup(googleAuthProvider)}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
