// Import important libraries
import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import cahinLogo from "../../assets/images/link.svg";
import classes from './navBar.module.css';

class NavBar extends Component {
    render() {
        return (
            <div className={classes.myNavBar}>
            <Navbar bg="dark" variant="dark"  sticky="top">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src={cahinLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}Don't Break the Chain
                </Navbar.Brand> 
                <Nav className="ml-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/auth">Login/Signup</Nav.Link>
                </Nav>
            </Navbar>
            </div>);
    }
}

export default NavBar;