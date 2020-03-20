import React, { Component } from 'react';
import classes from './App.module.css';

import DemoApp from './components/mainCalendar';


class App extends Component {

  render() {
    return (
      <div className={classes["App"]}>
        <DemoApp/>
      </div>
    );
  }
}

export default App;
