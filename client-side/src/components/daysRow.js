import React from 'react';

export default class DaysRow extends React.Component {

    render() {
        return (
            <div className="main__calendar__days">
                <span className="main__calendar__days__day">Sunday</span>
                <span className="main__calendar__days__day">Monday</span>
                <span className="main__calendar__days__day">Tuesday</span>
                <span className="main__calendar__days__day">Wednesday</span>
                <span className="main__calendar__days__day">Thursday</span>
                <span className="main__calendar__days__day">Friday</span>
                <span className="main__calendar__days__day">Saturday</span>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))