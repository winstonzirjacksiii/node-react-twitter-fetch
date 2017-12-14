import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);    
    this.state = {
      term: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchFunc(this.state.term);
  }

  render() {
    return (
      <form className="m-search-bar" onSubmit={this.handleSubmit}>
        <input className="m-search-bar--input" 
               placeholder="Search for tweets..." 
               onChange={(event)=>{this.setState({ term: event.target.value })}} />
      </form>
    )
  }

}

export default SearchBar;