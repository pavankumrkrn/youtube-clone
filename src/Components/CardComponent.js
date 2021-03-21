import React from 'react'
import { useHistory } from 'react-router'
import { MyContext } from './Context/MyContext'
import update from './UpdateMethod/update'

const CardComponent = (props) => {
    const { push } = useHistory();
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div className='row'>
                        {props.items.slice(0, 6).map((i, index) => {
                            return (
                                <div className="col-lg-3 col-md-6 mt-3" key={index}>
                                    <div className="card">
                                        <img src={i.snippet.thumbnails.high.url} alt="" className="card-img-top" onClick={() => {
                                            update.pushToHistory(value[0].user, i);
                                            push('/playvideo/' + i.id.videoId)
                                        }} />
                                        <div className="card-body">
                                            <div className="card-text">
                                                <b className='videoTitle' onClick={() => {
                                                    update.pushToHistory(value[0].user, i);
                                                    push('/playvideo/' + i.id.videoId)
                                                }}>
                                                    {i.snippet.title.split('').slice(0, 15).join('') + ' ...'}
                                                </b>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default CardComponent
