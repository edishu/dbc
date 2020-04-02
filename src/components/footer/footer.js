// Import important libraries
import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import classes from "./footer.module.css";

class Footer extends Component {
    render() {
        return (
            <div className={classes.myFooter}>
                <Navbar bg="dark" variant="dark"  fixed="bottom" >
                    <Nav className="ml-auto" >
                        <Navbar.Brand className={classes.navbarBrand}>
                            <Nav.Link 
                            href="https://www.linkedin.com/in/udayanmaurya" 
                            className={classes.navLink} 
                            target='_blank'>
                                <LinkedInIcon fontSize='large'/>
                            </Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Brand className={classes.navbarBrand}>    
                            <Nav.Link 
                            href="https://github.com/edishu/dbc" 
                            className={classes.navLink}
                            target='_blank'>
                                <GitHubIcon fontSize='large'/>
                            </Nav.Link>
                        </Navbar.Brand>
                    </Nav>
                </Navbar>
            </div>);
    }
}

export default Footer;