import React, { Component } from 'react';
import Tweet from './Tweet';

import '../css/TweetsContainer.css';

class TweetContainer extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      isUpdating: false
    }
  }

  toggleOpen(event) {
    event.preventDefault();
    this.setState({open: !this.state.open});
  }

  handleDelete(event) {
    const { deleteTweets, containerId } = this.props;
    event.preventDefault();
    event.stopPropagation();

    deleteTweets(containerId);
  }

  handleUpdate(event) {
    const { updateTweets, containerId, term } = this.props;
    event.preventDefault();
    event.stopPropagation();
    
    this.setState({isUpdating:true});    
    updateTweets(containerId, term).then((x) => {
      this.setState({isUpdating:false});      
    });
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
            <button className="m-btn" onClick={this.handleUpdate.bind(this)}>Refresh</button>
            { term }
            <button className="m-btn m-btn--delete" onClick={this.handleDelete.bind(this)}>&times;</button>
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