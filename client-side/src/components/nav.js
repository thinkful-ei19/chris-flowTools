import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {unselectDate} from '../actions/tasks';

export class Nav extends React.Component {

    render() {
        const bindThis = this;
        function logout() {
            bindThis.props.dispatch(unselectDate())
            bindThis.props.dispatch(clearAuth())
        }

        return (
            <nav className="nav">
                <h1 className="nav__h1">Flow Tools</h1>
                <ul className="nav__ul">
                    {/* <li className="nav__ul__li"><a className="nav__ul__li__button">Settings</a></li> */}
                    <li className="nav__ul__li"><a onClick={logout} className="nav__ul__li__button">Logout</a></li>
                </ul>
            </nav>
        )
    }

}

const mapStateToProps = state => ({

})

export default withRouter(connect(mapStateToProps)(Nav))