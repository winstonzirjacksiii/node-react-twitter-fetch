import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Tweet from './Tweet';

import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    };
  }

  searchForTweets(term){
    fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {
      this.setState({ tweets: resObj.statuses });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tweet Lookup</h1>
          <h3 className="App-subtitle">using React, Node, and Firebase</h3>
        </header>
        <SearchBar searchFunc={this.searchForTweets.bind(this)} />
        
        <section className="Tweets">
          { this.state.tweets.map((tweet) => {
            const { id, text, user  } = tweet;
            return <Tweet key={tweet.id } id={id} text={text} user={user} />;
          }) }
        </section>
      </div>
    );
  }
}

export default App;
