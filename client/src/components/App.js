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
      searches: [],
      currentUser: null      
    };

    this.dbRef = null;
  }

  componentDidMount() {    
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.dbRef = database.ref("Users").child(currentUser.uid+"/tweets");

        this.dbRef.on('value', (snapshot) => {
          this.setState({ tweets: snapshot.val() });
        });

        this.setState({ currentUser });
      } else {
        this.dbRef = null;
        this.setState({ currentUser: null });
      }
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

  searchForTweetsFB(term){
    return fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {
      const newState = Object.assign({}, this.state.tweets, {[term]: resObj.statuses});
      this.dbRef.push(newState);
    });
  }

  render() {
    const { currentUser, tweets } = this.state;    
    let tweetContainers = [],
        keys = [];

    if ( tweets ) {
      keys = Object.keys(tweets);
      debugger;
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
              <SearchBar searchFunc={this.searchForTweetsFB.bind(this)} />
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
