import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import YTSearch from 'youtube-api-search';
import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';
const API_KEY = 'AIzaSyBco2kUNnQlmcmemhUS9SlcW0XwW_1LNeQ';


class YoutubeApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        
        this.videoSearch('monstercat');
    }

    videoSearch(term) {
        YTSearch ({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
            // this.setState({ videos: videos });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 500)

        return (
            <div className="youtube__main">
                <VideoDetail video={this.state.selectedVideo} />
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoList
                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                videos={this.state.videos} />
            </div>
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
    
export default connect(mapStateToProps)(YoutubeApp)