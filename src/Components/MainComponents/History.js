import React from 'react'
import './history.css'
import { MyContext } from '../Context/MyContext';
import AddToPlaylist from '../UIComponents/AddToPlaylist';
import { useHistory } from 'react-router';
const History = () => {
    const { push } = useHistory()
    return (
        <MyContext.Consumer>
            {(value) => {
                const user = value[0].user
                return (
                    <div className='p-5'>
                        <p className="h5 mt-5">My History</p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">

                                {(user.history.length) ? <>

                                    {user.history.map((i, index) => {
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
                                                                        onClick={() => push('/playvideo/' + i.id.videoId)} /></div>
                                                            </div>
                                                            <div className="col-sm-6 mt-3">
                                                                <div className="card-text">
                                                                    <b className='videoTitle' onClick={() => push('/playvideo/' + i.id.videoId)}>
                                                                        {i.snippet.title}
                                                                    </b>
                                                                    <p className="text-left">
                                                                        {i.snippet.description}
                                                                    </p>
                                                                </div>
                                                                <p className='h6 mt-2'> {i.snippet.channelTitle}</p>
                                                            </div>
                                                            <div className="col-sm-2 text-center">
                                                                <AddToPlaylist video={i} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        )
                                    })}
                                </> : <>
                                    <div className="row mt-3">
                                        <div className="col-sm-12">
                                            No Watch History
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default History
