import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {toggleYoutube, togglePomodoro} from '../actions/widgets';

export class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const bindThis = this;
        function dispatchToggleYoutube() {
          return bindThis.props.dispatch(toggleYoutube());
        }
        function dispatchTogglePomodoro() {
            return bindThis.props.dispatch(togglePomodoro());
        }

        if (this.props.loggedIn) {
            return (
                <div className="footer">
                    <ul className="footer__ul">
                        <li className="footer__ul__li"><a onClick={dispatchTogglePomodoro} className="footer__ul__li__button">Pomodoro</a></li>
                        <li className="footer__ul__li"><a onClick={dispatchToggleYoutube} className="footer__ul__li__button">Youtube</a></li>
                        {/* <li className="footer__ul__li"><a className="footer__ul__li__button">Slack</a></li> */}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="footer">

                </div>
            )
        }


    }
}

const mapStateToProps = state => {
    return {
    loggedIn: state.auth.userId !== null,
        youtube: {
            on: state.widgets.youtube.on,
            minimized: state.widgets.youtube.minimized
        },
        pomodoro: {
            on: state.widgets.pomodoro.on,
            minimized: state.widgets.pomodoro.minimized
        }
    }
  }
    
export default connect(mapStateToProps)(Footer)