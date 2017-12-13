import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { tweets: [] };
  }

  componentDidMount(){
    fetch('/search/cats')
    .then((res) => res.json())
    .then((resObj) => {
      this.setState({ tweets: resObj.statuses });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Here are some tweets about cats</h1>
        </header>
        <section className="Tweets">
          { this.state.tweets.map((tweet, i) => <div key={i}>{tweet.text}</div>) }
        </section>
      </div>
    );
  }
}

export default App;
