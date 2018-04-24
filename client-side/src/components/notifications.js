import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

export default class Notifications extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Notifications</h3>
                <ul>

                </ul>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))