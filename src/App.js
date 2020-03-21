import React, { Component } from 'react';
import classes from './App.module.css';

import HeroPage from './containers/HeroPage/HeroPage';

class App extends Component {

  render() {
    return (
      <div className={classes.App}>
        <HeroPage/>
      </div>
    );
  }
}

export default App;
