import React from 'react'
import { items } from "./json";
import { MyContext } from '../Context/MyContext';
import AddToPlaylist from '../UIComponents/AddToPlaylist';
import { useHistory } from 'react-router';
import Loader from 'react-loader-spinner';
import update from '../UpdateMethod/update';
const Trending = () => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=trend&maxResults=30&key=AIzaSyA8_QL_C34H63d5sT1vMn-JF3SXeo69GEk`;
    const [videoCards, setVideoCards] = React.useState([]);
    const [loader, setLoader] = React.useState(false)
    const { push } = useHistory();
    React.useEffect(() => {
        fetch(url).then((data) => data.json())
            .then((data) => {
                setLoader(!loader)
                setVideoCards(data.items)
            })
    }, [])
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div className='p-5 main'>
                        {!loader ? <div className="container p-5 abs">
                            <div className="row justify-content-center pr-5">
                                <div className="col-sm-12 text-center">
                                    <Loader
                                        type="TailSpin"
                                        color="Black"
                                        height={100}
                                        width={100} />
                                </div>
                            </div>
                        </div> : null}
                        <p className="h5">Trending</p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                {videoCards.filter((i) => i.snippet.title !== i.snippet.channelTitle).map((i, index) => {
                                    return (
                                        <>
                                            <div className="row pt-5" key={index + 'srch'}>
                                                <div className="card col-sm-12 hisCard">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                                            <div className="card">
                                                                <img
                                                                    src={i.snippet.thumbnails.high.url} alt=""
                                                                    className="card-img-top"
                                                                    onClick={() => {
                                                                        update.pushToHistory(value[0].user, i);
                                                                        push('/playvideo/' + i.id.videoId)
                                                                    }} /></div>
                                                        </div>
                                                        <div className="col-sm-6 mt-3">
                                                            <div className="card-text">
                                                                <b className='videoTitle' onClick={() => {
                                                                    update.pushToHistory(value[0].user, i);
                                                                    push('/playvideo/' + i.id.videoId)
                                                                }}>
                                                                    {i.snippet.title}
                                                                </b>
                                                                <p className="text-left">
                                                                    {i.snippet.description}
                                                                </p>
                                                            </div>
                                                            <p className='h6 mt-2'> {i.snippet.channelTitle}</p>
                                                            <p className='mt-1'> {'uploaded on ' + i.snippet.publishTime.split('T')[0]}</p>
                                                        </div>
                                                        <div className="col-sm-2 text-center">
                                                            <AddToPlaylist video={i} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default Trending
