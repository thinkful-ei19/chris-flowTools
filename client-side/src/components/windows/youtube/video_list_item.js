import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
    <li onClick={() => onVideoSelect(video)} className="youtube__li">
        <img alt="thumbnail" className="youtube__li__thumbnail" src={imageUrl} />
        <span className="youtube__li__details">{video.snippet.title}</span>
    </li>
    );
};

export default VideoListItem;