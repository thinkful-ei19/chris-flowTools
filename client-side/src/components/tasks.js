import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

export default class Tasks extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tasks">
                <h4 className="tasks__day">Wednedsay, April 25th</h4>
                <ul className="tasks__ul">
                <li className="tasks__ul__li">
                        <input id="task_1"  className="tasks__ul__li__input" type="checkbox" />
                        <label for="task_1"  className="tasks__ul__li__label">Continue with FlexBox Curriculum</label>
                    </li>
                    <li className="tasks__ul__li">
                        <input id="task_2" className="tasks__ul__li__input" type="checkbox" />
                        <label for="task_2" className="tasks__ul__li__label">Take dogs for a walk</label>
                    </li>
                </ul>
                <button className="tasks__button">New Task</button>
            </div>
        )
    }

}

//const mapStateToProps = state => ({})

//export default withRouter(connect(mapStateToProps)(Nav))