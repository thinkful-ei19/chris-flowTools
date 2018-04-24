import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';

export default class DateRows extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const currentYear = moment().format('YYYY');
        //January starts at 0 in this library;
        let currentMonth = (moment().format('MM'));
        const currentDay = moment().format('dddd');
        const currentDayNum = moment().format('D');
        const firstDayOfMonth = moment().startOf('month').format('e');
        const maxDays = moment().daysInMonth()
        const previousMonth = moment().format('YYYY-' + String(currentMonth));
        const maxDaysPrevious = moment(previousMonth).daysInMonth();

        let dateArray = [];

        //First Push the previous month's days
        for (let i=maxDaysPrevious; i>maxDaysPrevious-firstDayOfMonth; i--) {
            if (currentMonth >= 10) {
                dateArray.push({
                    value: `${currentYear}-${currentMonth}-${i}`,
                    day: `${i}`
                });
            } else {
                dateArray.push({
                    value: `${currentYear}-0${currentMonth}-${i}`,
                    day: `${i}`
                });
            }
        }
        dateArray.reverse();

        //Push the amount of days in current month
        for (let i=1; i<=maxDays; i++) {
            if (i<10) {
                dateArray.push({value: `${currentYear}-${currentMonth}-0${i}`, day: `0${i}`})
            } else {
                dateArray.push({value: `${currentYear}-${currentMonth}-${i}`, day: `${i}`})
            }
        }

        //Push the days for the next month
        let nextMonth = String(Number(currentMonth) + 1);
        if (nextMonth < 10) {
            nextMonth = '0' + nextMonth;
        }
        for (let i=dateArray.length+1; i<=35; i++) {
            dateArray.push(
            {
                value: `${currentYear}-${nextMonth}-0${i-maxDays}`,
                day: `${i-maxDays}`
            }
            )
        }
        const htmlArray = dateArray.map(function(item) {
            return (
                <span key={item.value} value={item.value} className="main__block">{item.day}</span>
            )
        })

        return (
            htmlArray
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))