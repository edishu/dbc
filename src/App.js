import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './components/UI/Layout/Layout';
import HeroPage from './containers/HeroPage/HeroPage';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    console.log(`[App.js] ${this.props.isAuthenticated}`);
    let route = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={HeroPage}/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={HeroPage}/>
          <Redirect to="/"/>
        </Switch>
      );
    };

    return (
      <BrowserRouter>
        <Layout>
          {route}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !==null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

