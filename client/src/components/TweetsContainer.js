import React, { Component } from 'react';
import Tweet from './Tweet';

import '../css/TweetsContainer.css';

class TweetContainer extends Component {
  constructor(){
    super();
    this.state = {
      open: false
    }

  }

  toggleOpen(event) {
    event.preventDefault();
    this.setState({open: !this.state.open});
  }

  render() {
    const { term } = this.props;
    const tweets = this.props.tweets.map((tweet) => {
      const { id, text, user  } = tweet;
      return <Tweet key={tweet.id } id={id} text={text} user={user} />;
    });
    const isVisible = this.state.open ? ' is-open' : ' is-closed';

    return (
      <aside className={"m-tweets-container" + isVisible}>
        <div className="m-tweets-container--toggler"
             onClick={this.toggleOpen.bind(this)}>
            { term }
        </div>
        <div className="m-tweets-container--content">
          { tweets }
        </div>
      </aside>
    )
    
  }
}

export default TweetContainer;