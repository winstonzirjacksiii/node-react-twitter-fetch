import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Tweets from './Tweets';
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

    return (
      <div className="App">
        <header className="App-header">
          { currentUser && <CurrentUser user={currentUser} /> }
          <h1 className="App-title">Tweet Lookup</h1>
          <h3 className="App-subtitle">using React, Node, and Firebase</h3>
        </header>
        <div className="m-main">
          { !currentUser && <SignIn /> }
          { currentUser && 
            <div>
              <SearchBar searchFunc={this.searchForTweets.bind(this)} />
              <Tweets tweets={tweets}
                      deleteTweets={this.deleteTweets.bind(this)}
                      updateTweets={this.updateTweets.bind(this)} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
