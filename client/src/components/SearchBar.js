import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);    
    this.state = {
      term: "",
      isLoading: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading:true});    
    this.props.searchFunc(this.state.term).then((x) => {
      this.setState({isLoading: false});      
    });
  }

  render() {    
    return (
      <form className="m-search-bar" onSubmit={this.handleSubmit.bind(this)}>
        <input className="m-search-bar--input" disabled={this.state.isLoading}
               placeholder="Search for tweets..." 
               onChange={(event)=>{this.setState({ term: event.target.value })}} />
      </form>
    )
  }

}

export default SearchBar;