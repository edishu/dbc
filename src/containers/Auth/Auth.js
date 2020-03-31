import React, { Component } from 'react';
import {connect} from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        signingUp: false
    }

    toggleSignInUp = () => {
        this.setState({signingUp: !this.state.signingUp});
    }

    render () {
        // console.log(this.props);
        let page = <SignIn 
                    signinbtn={this.props.onSignin}
                    toggel={this.toggleSignInUp} 
                    parent={this.props.location.pathname}/>;
        if (this.state.signingUp) {
            page = <SignUp 
                    signupbtn={this.props.onSignup}
                    toggel={this.toggleSignInUp}/>;
        }
        return page;
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignin: () => console.log('signin pressed'),
        onSignup: (email, password) => actions.auth(email, password),
    }; 
};

export default connect(null, mapDispatchToProps)(Auth);