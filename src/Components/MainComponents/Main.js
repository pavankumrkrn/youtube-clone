import React from 'react'
import './main.css'
import { items } from "./json";
import { MyContext } from '../Context/MyContext';
import AddToPlaylist from '../UIComponents/AddToPlaylist';
import { useHistory } from 'react-router';
import { pushToHistory } from '../UpdateMethod/update';
import Loader from 'react-loader-spinner';
const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=AIzaSyA8_QL_C34H63d5sT1vMn-JF3SXeo69GEk'
const Main = (props) => {
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
                const user = value[0].user;
                return (

                    <div className='main'>
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
                        <div className="container-fluid mt-5">
                            <p className="h5">Recommended</p>
                            <div className="row">
                                {videoCards.filter((i) => i.snippet.title !== i.snippet.channelTitle).map((i, index) => {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-sm-12 mt-3" key={index}>
                                            <div className="card videoCard">
                                                <img src={i.snippet.thumbnails.high.url} alt=""
                                                    className="card-img-top imgCard"
                                                    onClick={() => {
                                                        pushToHistory(value[0].user, i);
                                                        push('/playvideo/' + i.id.videoId)
                                                    }
                                                    } />
                                                <div className="card-body">
                                                    <div className="card-text mb-5">
                                                        <b className='videoTitle'
                                                            onClick={() => {
                                                                pushToHistory(value[0].user, i);
                                                                push('/playvideo/' + i.id.videoId)
                                                            }}>
                                                            {i.snippet.title}
                                                        </b>
                                                    </div>
                                                    <AddToPlaylist video={i} />
                                                    <p className='h6 mt-5'> {i.snippet.channelTitle}</p>
                                                    <p className='mt-1'> {'uploaded on ' + i.snippet.publishTime.split('T')[0]}</p>
                                                </div>
                                            </div>
                                        </div>
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

export default Main
