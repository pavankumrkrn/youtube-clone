import React from 'react'
import './sidebar.css'
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import NewPlaylist from '../NewPlaylist';
import AlertModal from '../AlertModal';
const Sidebar = (props) => {
    const { pathname } = useLocation();
    const { push } = useHistory();
    const [modal, setModal] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const toggle = () => setModal(!modal);
    const change = () => setAlert(!alert);

    React.useState(() => {

    }, [pathname])
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div className="sidebar">
                        <div className={pathname.includes('/home') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"} onClick={() => push('/home')}>
                            <HomeIcon className='icon' /> <p className='ml-3 mr-5'>Home</p> </div>
                        <div onClick={() => push('/trending')} className={pathname.includes('/trending') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}>
                            <WhatshotIcon className='icon' /> <p className='ml-3 mr-5'>Trending</p></div>
                        <div onClick={() => push('/subs')} className={pathname.includes('/subs') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}>
                            <SubscriptionsIcon className='icon' /> <p className='ml-3 mr-5'>Subscriptions</p> </div>
                        <hr />
                        <div onClick={() => {
                            if (value[0].user !== null) {
                                push('/library')
                            } else {
                                change();
                            }
                        }
                        } className={pathname.includes('/library') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}>
                            <VideoLibraryIcon className='icon' /> <p className='ml-3 mr-5'>Library</p> </div>
                        <div onClick={() => {
                            if (value[0].user !== null) {
                                push('/history')
                            } else {
                                change();
                            }
                        }} className={pathname.includes('/history') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}>
                            <HistoryIcon className='icon' /> <p className='ml-3 mr-5'>History</p> </div>
                        <hr />
                        <p className="h5 pl-5">Playlists</p>
                        {(value[0].user !== null) ?
                            <>
                                <div className="playlistItems">
                                    <div className={pathname.includes('/playlist/watchlater') ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}
                                        onClick={() => push('/playlist/watchlater')}>
                                        <PlaylistPlayIcon className='icon' /> <p className='ml-3 mr-5'>Watch-Later</p> </div>
                                    {Object.keys(value[0].user.playlists).map((i, index) => {
                                        if (i !== 'watchlater') {
                                            return (
                                                <div className={pathname.includes('/playlist/' + i) ? "pt-3 item actIcon pl-3 mt-3" : "pt-3 item pl-3 mt-3"}
                                                    onClick={() => push('/playlist/' + i)} key={index}>
                                                    <p className='ml-3 mr-5'>{i}</p> </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div className="pt-3 pl-3 item mt-3" onClick={toggle}>
                                    <AddIcon className='icon' /> <p className='ml-3 mr-5'>New Playlist</p>
                                </div>
                            </>
                            : <>
                                <div className="pt-3 pl-3 mt-3" onClick={toggle}>
                                    <p className='ml-3 mr-5 text-center'>Login to view and create playlists</p>
                                </div></>}
                        <NewPlaylist modal={modal} toggle={toggle} />
                        <AlertModal modal={alert} toggle={change} text={'Please Login / SignUp to access this'} />
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default Sidebar
