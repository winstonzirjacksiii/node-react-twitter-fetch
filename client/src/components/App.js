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
        this.dbRef = database.ref("Users").child(`${currentUser.uid}/tweets/`);

        this.dbRef.on('value', (snapshot) => {
          const val = snapshot.val();
          this.setState({ tweets: val });
        });

        this.setState({ currentUser });
      } else {
        this.dbRef = null;
        this.setState({ currentUser: null });
      }
    });
  }

  searchForTweets(term) {
    return fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {
      const newState = Object.assign({}, this.state.tweets, {statuses: resObj.statuses, term});
      this.dbRef.push(newState);
    });
  }

  updateTweets(key, term) {
    return fetch('/search/'+ term)
    .then((res) => res.json())
    .then((resObj) => {      
      const opTweets = this.state.tweets[key];
      const newTweets = [...resObj.statuses, ...opTweets.statuses];
      const newState = Object.assign({}, this.state.tweets, {[key]:{statuses:newTweets, term}});

      this.dbRef.update(newState);
    });
  }

  deleteTweets(key) {
    this.dbRef.child(key).remove();
  }

  render() {
    const { currentUser, tweets } = this.state;
    let tweetContainers = [],
        keys = [];

    if ( tweets && Object.keys(tweets).length ) {
      keys = Object.keys(tweets);
      tweetContainers = keys.map((x, i) => <TweetsContainer key={x}
                                                            containerId={x} 
                                                            term={tweets[x].term} 
                                                            tweets={tweets[x].statuses} 
                                                            preview={tweets[x].statuses[0]} 
                                                            deleteTweets={this.deleteTweets.bind(this)} 
                                                            updateTweets ={this.updateTweets.bind(this)}/> );
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
