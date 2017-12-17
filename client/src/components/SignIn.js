import React, { Component } from 'react';
import { auth, googleAuthProvider } from '../firebase';

class SignIn extends Component {
  render() {
    return (
      <div className="m-signin">
        <button className="m-btn m-signin--btn" onClick={() => auth.signInWithPopup(googleAuthProvider)}>
          Sign In
        </button>
      </div>
    );
  }
}

export default SignIn;
