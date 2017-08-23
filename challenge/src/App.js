import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FETCH_JOKE, CLEAR_LOCAL_JOKES } from './actions'
import './App.css'

class App extends Component {

  _renderJokes() {
    let { jokes } = this.props;
    let list = [];
    if (jokes.length === 0) {
      return (
        <ul>
          <li><em>No Jokes. Click the button below to load joke!</em></li>
        </ul>
      )
    }

    for (let i = 0; i < jokes.length; i++) {
      list.push(
        <li key={i}>
          {jokes[i].joke}
        </li>
      );
    }
    return (
        <ul>
          {list}
        </ul>
      )
  }

  handleLoadJoke() {
    this.props.dispatch({type: FETCH_JOKE});
  }

  handleClearLocalStorage() {
    this.props.dispatch({type: CLEAR_LOCAL_JOKES});
  }

  render() {
    const { jokes, isLoading, errorMsg } = this.props
    return (
      <div className="App">
        <h1 className="title">Jokes</h1>
        <div className="jokeList">
          {this._renderJokes()}
        </div>
        <div className={errorMsg === '' ? 'errorMsg inactive' : 'errorMsg'}>
          {errorMsg}
        </div>
        <div className="buttons">
          <button onClick={this.handleLoadJoke.bind(this)} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'One More'}
          </button>
          <button onClick={this.handleClearLocalStorage.bind(this)} disabled={jokes.length === 0}>
            { 'Clear Local Storage'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { jokes, isLoading, errorMsg } = state;
  return {
    jokes,
    isLoading,
    errorMsg
  }
}
export default connect(
  mapStateToProps
)(App);
