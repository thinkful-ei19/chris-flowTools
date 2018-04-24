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
                    <li className="footer__ul__li"><button className="footer__ul__li__button">Pomodoro</button></li>
                    <li className="footer__ul__li"><button className="footer__ul__li__button">Youtube</button></li>
                    <li className="footer__ul__li"><button className="footer__ul__li__button">Slack</button></li>
                </ul>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))