import React, { Component } from 'react';
import {connect} from 'react-redux';
import Draggable from 'react-draggable';
import PomodoroApp from './index';
import {togglePomodoro} from '../../../actions/widgets';

export class Pomodoro extends Component {

    render() {

        const bindThis = this;
        function dispatchTogglePomodoro() {
          return bindThis.props.dispatch(togglePomodoro())
        }

        return (
            <Draggable
            axis="both"
            handle=".pomodoro__handle"
            defaultPosition={
            {x: 0, y: 0}}
            position={null}
            grid={[1, 1]}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="pomodoro">
                <div className="pomodoro__handle">
                    <h5 className="pomodoro__header">Pomodoro</h5>
                </div>
                <a onClick={dispatchTogglePomodoro} className="pomodoro__exit" >X</a>
                <input id='pomodoro__minimize-checkbox' defaultChecked={false} className="pomodoro__minimize__checkbox" type="checkbox" />
                <label htmlFor='pomodoro__minimize-checkbox' className="pomodoro__minimize"><a>&#8722;</a></label>
                <PomodoroApp />
            </div>
          </Draggable>
            );
    }
};

const mapStateToProps = state => {
    return {
      pomodoro: {
        on: state.widgets.pomodoro.on,
        minimized: state.widgets.pomodoro.minimized
      }
    }
  }
    
export default connect(mapStateToProps)(Pomodoro)