import React, { Component , Fragment } from "react";

import NavBar from '../../navBar/navBar';
import Footer from '../../footer/footer';

class Layout extends Component {
    render () {
        return (
            <Fragment>
                <NavBar/>         
                    {this.props.children}            
                <Footer/>
            </Fragment>
        );
    }
}

export default Layout;