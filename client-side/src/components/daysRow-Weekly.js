import React from 'react';

export default class DaysRow extends React.Component {
    
    render() {
        return (
            <div className="weekly__days">
                <span className="weekly__days__day">Sunday</span>
                <span className="weekly__days__day">Monday</span>
                <span className="weekly__days__day">Tuesday</span>
                <span className="weekly__days__day">Wednesday</span>
                <span className="weekly__days__day">Thursday</span>
                <span className="weekly__days__day">Friday</span>
                <span className="weekly__days__day">Saturday</span>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))