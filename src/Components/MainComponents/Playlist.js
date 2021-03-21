import React from 'react'
import { useHistory, useParams } from 'react-router';
import { MyContext } from '../Context/MyContext';
import { pushToHistory } from '../UpdateMethod/update';
import { items } from "./json";

const Playlist = () => {
    const { push } = useHistory();
    const { name } = useParams();
    console.log(name)
    React.useEffect(() => {

    }, [name])
    return (
        <MyContext.Consumer>
            {(value) => {
                const user = value[0].user
                const items = user.playlists[name]
                return (
                    <div className='p-5'>
                        <p className="h5 mt-5">Playlist - {name}</p>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12">
                                {(items.length) ? <>

                                    {items.map((i, index) => {
                                        return (
                                            <>
                                                <div className="row mt-3" key={index}>
                                                    <div className="card col-sm-12 noBo">
                                                        <div className="row">
                                                            <div className="col-lg-3 col-md-3 col-sm-12">
                                                                <div className="card noBo">
                                                                    <img src={i.snippet.thumbnails.high.url} alt="" className="card-img-top"
                                                                        onClick={() => {
                                                                            pushToHistory(value[0].user, i);
                                                                            push('/playvideo/' + i.id.videoId)
                                                                        }} /></div>
                                                            </div>
                                                            <div className="col-sm-6 mt-3">
                                                                <div className="card-text">
                                                                    <b className='videoTitle'
                                                                        onClick={() => {
                                                                            pushToHistory(value[0].user, i);
                                                                            push('/playvideo/' + i.id.videoId)
                                                                        }}>
                                                                        {i.snippet.title}
                                                                    </b>
                                                                </div>
                                                                <p className='h6 mt-2'> {i.snippet.channelTitle}</p>
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
                                            No Items
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

export default Playlist
