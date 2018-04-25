import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="footer">
                <ul className="footer__ul">
                    <li className="footer__ul__li"><a className="footer__ul__li__button">Pomodoro</a></li>
                    <li className="footer__ul__li"><a className="footer__ul__li__button">Youtube</a></li>
                    <li className="footer__ul__li"><a className="footer__ul__li__button">Slack</a></li>
                </ul>
            </div>
        )
    }

}