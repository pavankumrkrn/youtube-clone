import React from 'react';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import { MyContext } from '../Context/MyContext';
import AddToPlaylist from '../UIComponents/AddToPlaylist';
import './videoplay.css'

const VideoPlay = () => {
    const params = useParams();
    const url = `https://www.youtube.com/watch?v=${params.videoId}`
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${params.videoId}&key=AIzaSyA8_QL_C34H63d5sT1vMn-JF3SXeo69GEk`
    let [video, setVideo] = React.useState({});
    React.useEffect(() => {
        fetch(videoUrl).then((data) => data.json())
            .then((data) => {
                console.log(data)
                setVideo(data)
            });
    }, [params.videoId])

    return (
        <div className='p-5 video'>

            <ReactPlayer url={url} controls={true}
                width="100%" height="100%" />

            <hr />
            <div className="row">
                {(video.items) ? <>
                    <div className="col-sm-12">
                        <h5 className='mb-5'>{video.items[0].snippet.title}</h5>
                        <h6>{video.items[0].snippet.description}</h6>
                        <hr />
                        <b className='mt-3'>{'Channnel : ' + video.items[0].snippet.channelTitle}</b>
                        <p className='mt-3'>Uploaded on <b>{video.items[0].snippet.publishedAt.split('T')[0]}</b></p>
                    </div>
                </> : null}
            </div>
        </div>

    )
}

export default VideoPlay