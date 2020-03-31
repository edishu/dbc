// Import important libraries
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

import classes from "./footer.module.css";

class Footer extends Component {
    render() {
        return (
            <div className={classes.myFooter}>
                <Navbar bg="dark" variant="dark"  fixed="bottom" >
                    <Navbar.Brand>
                    Don't Break the Chain
                    </Navbar.Brand>
                </Navbar>
            </div>);
    }
}

export default Footer;