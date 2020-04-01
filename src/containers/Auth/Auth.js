import React, { Component } from 'react';
import Input from  '../../components/UI/Input/Input';
import {Link} from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';
import Typography from '@material-ui/core/Typography';

class Auth extends Component {
    state = {
        controls: {
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler = (event, controlName) => {

        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.Email.value, this.state.controls.Password.value, this.state.isSignUp);
    };

    switchAuthModehandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    render () {
        const formElements = [];
        for(let key of Object.keys(this.state.controls)) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElements.map(element => (
                            <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            label={element.id}
                            changed={(ev) => this.inputChangeHandler(ev, element.id)}
                            invalid={!element.config.valid}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}>
                            </Input>)
            );
        
        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let authStatus = <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>;
        
        if (this.state.isSignUp) {
            authStatus = <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>;
        }

        return (
            <div className={classes.Auth}>
                {authStatus}
                {redirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Link btnType="Success">Submit</Link>
                </form>
                <Link 
                    clicked={this.switchAuthModehandler}
                    btnType="Danger">
                    Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);