import React, { Component } from 'react';
import TweetsContainer from './TweetsContainer';

import '../css/Tweets.css';

class Tweets extends Component {
  render() {
    const { tweets, deleteTweets, updateTweets } = this.props;
    
    let tweetContainers = [],
    keys = [];
    if ( tweets && Object.keys(tweets).length ) {
      keys = Object.keys(tweets);
      tweetContainers = keys.map((x, i) => <TweetsContainer key={x}
                                                            containerId={x} 
                                                            term={tweets[x].term} 
                                                            tweets={tweets[x].statuses} 
                                                            preview={tweets[x].statuses[0]} 
                                                            deleteTweets={deleteTweets} 
                                                            updateTweets={updateTweets} /> );
    }
    return (
      <section className="m-tweets">
        <div className="m-tiles">
          {tweetContainers}
        </div>
      </section>
    );
  }
}

export default Tweets;