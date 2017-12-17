import React, { Component } from 'react';
import Tweet from './Tweet';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

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
    if (!event.target.classList.contains('m-tweet')) this.setState({open: !this.state.open});
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
    const isOpen = this.state.open ? ' is-open' : ' is-closed';

    return (
      <aside className={"m-tweets-container" + isOpen}
             onClick={this.toggleOpen.bind(this)}>
        <div>
          <div className="m-tweets-container--toggler">
              <button className="m-btn m-btn--refresh" onClick={this.handleUpdate.bind(this)}>
              <FontAwesome name='refresh'
                           size='2x'
                           style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
              </button>
              { term }
              <button className="m-btn m-btn--delete" onClick={this.handleDelete.bind(this)}>
                <FontAwesome name='trash' 
                             size='2x'
                             style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
              </button>
          </div>
          <div className={"m-tweets-container--preview"}>
            <b>{ preview.user.name }:</b> {preview.text}
          </div>
          <div className="m-tweets-container--content">
            { tweets }
          </div>
        </div>
      </aside>
    )
    
  }
}

TweetContainer.propTypes = {
  containerId: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired, 
  tweets: PropTypes.array.isRequired, 
  preview: PropTypes.object.isRequired, 
  deleteTweets: PropTypes.func.isRequired, 
  updateTweets: PropTypes.func.isRequired
};

export default TweetContainer;