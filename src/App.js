import React, { Component } from 'react';

import Layout from './components/UI/Layout/Layout';
import HeroPage from './containers/HeroPage/HeroPage';
import Auth from './containers/Auth/Auth';
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom';

class App extends Component {

  render() {

    let route = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={HeroPage}/>
        <Redirect to="/"/>
      </Switch>
    );

    return (
      <BrowserRouter>
        <Layout>
          {route}
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
