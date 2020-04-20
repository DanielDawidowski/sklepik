import React from 'react';
import styled from 'styled-components';

const Video = styled.div`
    padding-top: 7rem;
    z-index: 1000;
    background-color: ${props => props.theme.red};
    .overlay {
        margin-top: 7rem;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(rgba(0, 0, 0, 0.919), rgba(0, 0, 0, 0.919));
        height: 90vh;
        width: 100%;
        z-index: 1001;
        opacity: 0.7;
    }
    video {
        object-fit: cover;
        height: 90vh;
    }
`;

const VideoBG = () => {
    return (
        <Video>
            <video width="100%" autoPlay loop muted src='../static/film1.mp4' type="video/mp4" />
            <div className="overlay"></div>
        </Video>
    )
}

export default VideoBG;