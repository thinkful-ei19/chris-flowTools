import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';

export class Nav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const bindThis = this;
        function logout() {
            bindThis.props.dispatch(clearAuth())
        }

        return (
            <nav className="nav">
                <h1 className="nav__h1">Flow Tools</h1>
                <ul className="nav__ul">
                    <li className="nav__ul__li"><a href="#" className="nav__ul__li__button">Widgets</a></li>
                    <li className="nav__ul__li"><a href="#" className="nav__ul__li__button">Settings</a></li>
                    <li className="nav__ul__li"><a href="#" onClick={logout} className="nav__ul__li__button">Logout</a></li>
                </ul>
            </nav>
        )
    }

}

const mapStateToProps = state => ({

})

export default withRouter(connect(mapStateToProps)(Nav))