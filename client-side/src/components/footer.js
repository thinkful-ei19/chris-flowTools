import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {toggleYoutube} from '../actions/widgets';

export class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const bindThis = this;
        function dispatchToggleYoutube() {
          return bindThis.props.dispatch(toggleYoutube())
        }

        return (
            <div className="footer">
                <ul className="footer__ul">
                    <li className="footer__ul__li"><a className="footer__ul__li__button">Pomodoro</a></li>
                    <li className="footer__ul__li"><a onClick={dispatchToggleYoutube} className="footer__ul__li__button">Youtube</a></li>
                    <li className="footer__ul__li"><a className="footer__ul__li__button">Slack</a></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      youtube: {
        on: state.widgets.youtube.on,
        minimized: state.widgets.youtube.minimized
      }
    }
  }
    
export default connect(mapStateToProps)(Footer)