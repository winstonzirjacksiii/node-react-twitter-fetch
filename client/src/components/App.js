import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TweetsContainer from './TweetsContainer';

import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: {}
    };
  }

  searchForTweets(term){
    fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {
      const newState = Object.assign({}, this.state.tweets, {[term]: resObj.statuses});
      debugger;
      this.setState({ tweets: newState });
    });
  }

  render() {
    const keys = Object.keys(this.state.tweets);
    let tweetContainers = [];
    if ( keys.length ) {
      tweetContainers = keys.map((x, i) => <TweetsContainer key={i} term={x} tweets={this.state.tweets[x]} />);
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tweet Lookup</h1>
          <h3 className="App-subtitle">using React, Node, and Firebase</h3>
        </header>
        <div className="m-main">
          <SearchBar searchFunc={this.searchForTweets.bind(this)} />
          <section className="Tweets">
            { 
              keys.length ? 
              tweetContainers :
              ""
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
