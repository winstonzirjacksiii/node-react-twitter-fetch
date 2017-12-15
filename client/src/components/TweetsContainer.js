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
    const { term, preview } = this.props;
    const tweets = this.props.tweets.map((tweet) => {
      const { id, text, user  } = tweet;
      return <Tweet key={tweet.id } id={id} text={text} user={user} />;
    });
    const isVisible = this.state.open ? ' is-open' : ' is-closed';

    return (
      <aside className={"m-tweets-container" + isVisible}
             onClick={this.toggleOpen.bind(this)}>
        <div className="m-tweets-container--toggler">
            { term }
        </div>
        <div className={"m-tweets-container--preview"}>
          <b>{ preview.user.name }:</b> {preview.text}
        </div>
        <div className="m-tweets-container--content">
          { tweets }
        </div>
      </aside>
    )
    
  }
}

export default TweetContainer;