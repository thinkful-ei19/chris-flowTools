import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="nav">
                <h1 className="nav__h1">Flow Tools</h1>
                <ul className="nav__ul">
                    <li className="nav__ul__li"><button className="nav__ul__li__button">Widgets</button></li>
                    <li className="nav__ul__li"><button className="nav__ul__li__button">Settings</button></li>
                </ul>
            </nav>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))