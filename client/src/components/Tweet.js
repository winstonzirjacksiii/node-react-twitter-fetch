import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Tweet.css';

class Tweet extends Component {
  render() {
    const {text, user} = this.props;
    return (
      <div className="m-tweet">
        <div className="m-tweet--user">
          <img src={user.profile_image_url_https} alt={user.screen_name} />
          <h4>{user.name}</h4>
          <h5>({user.screen_name})</h5>
        </div>
        <div className="m-tweet--content">{text}</div>
      </div>
    );
  }
}

Tweet.propTypes = {
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default Tweet;