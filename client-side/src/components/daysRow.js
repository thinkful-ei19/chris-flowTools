import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

export default class DaysRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="main__days">
                <span className="main__days__day">Sunday</span>
                <span className="main__days__day">Monday</span>
                <span className="main__days__day">Tuesday</span>
                <span className="main__days__day">Wednesday</span>
                <span className="main__days__day">Thursday</span>
                <span className="main__days__day">Friday</span>
                <span className="main__days__day">Saturday</span>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))