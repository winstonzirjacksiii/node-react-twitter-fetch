import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TweetsContainer from './TweetsContainer';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import { auth, database } from '../firebase';


import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tweets: {},
      currentUser: null      
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser });
    });
  }

  searchForTweets(term){
    return fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {
      const newState = Object.assign({}, this.state.tweets, {[term]: resObj.statuses});
      this.setState({ tweets: newState });
    });
  }

  render() {
    const { currentUser, tweets } = this.state;    
    const keys = Object.keys(tweets);
    let tweetContainers = [];
    if ( keys.length ) {
      tweetContainers = keys.map((x, i) => <TweetsContainer key={i} 
                                                            term={x} 
                                                            tweets={this.state.tweets[x]} 
                                                            preview={this.state.tweets[x][0]} />);
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tweet Lookup</h1>
          <h3 className="App-subtitle">using React, Node, and Firebase</h3>
        </header>
        <div className="m-main">
          { !currentUser && <SignIn /> }
          { currentUser && 
            <div>
              <CurrentUser user={currentUser} />
              <SearchBar searchFunc={this.searchForTweets.bind(this)} />
              <section className="Tweets">
                { !!keys.length && tweetContainers }
              </section>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
