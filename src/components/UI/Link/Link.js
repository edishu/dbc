import React from 'react';
import Link from '@material-ui/core/Link';
import classes from './Link.module.css';

export const LinkUser = (props) => (
    <button
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button>
);