import React, { Component } from 'react';
import '../css/Tweet.css';

class Tweet extends Component {
  render() {
    const {text, user} = this.props;
    debugger;
    return (
      <div className="m-tweet">
        <div className="m-tweet--user">
          <img src={user.profile_image_url} />
          <h4>{user.name}</h4>
          <h5>({user.screen_name})</h5>
        </div>
        <div className="m-tweet--content">{text}</div>
      </div>
    );
  }
}

export default Tweet;