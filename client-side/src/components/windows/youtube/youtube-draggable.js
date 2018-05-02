import React, { Component } from 'react';
import {connect} from 'react-redux';
import YoutubeApp from './index';
import Draggable from 'react-draggable';
import {toggleYoutube} from '../../../actions/widgets';

export class Youtube extends Component {

    render() {

        const bindThis = this;
        function dispatchToggleYoutube() {
          return bindThis.props.dispatch(toggleYoutube())
        }

        return (
            <Draggable
            axis="both"
            handle=".youtube__handle"
            defaultPosition={
            {x: 0, y: 0}}
            position={null}
            grid={[1, 1]}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="youtube">
                <div className="youtube__handle">
                    <h5 className="youtube__header">Youtube API</h5>
                </div>
                <a onClick={dispatchToggleYoutube} className="youtube__exit" >X</a>
                <input id='youtube__minimize-checkbox' defaultChecked={false} className="youtube__minimize__checkbox" type="checkbox" />
                <label htmlFor='youtube__minimize-checkbox' className="youtube__minimize"><a>&#8722;</a></label>
                <YoutubeApp />
            </div>
          </Draggable>
            );
    }
};

const mapStateToProps = state => {
    return {
      youtube: {
        on: state.widgets.youtube.on,
        minimized: state.widgets.youtube.minimized
      }
    }
  }
    
export default connect(mapStateToProps)(Youtube)