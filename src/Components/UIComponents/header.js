import React from 'react';
import './header.css'
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Login } from '../LoginModal/Login';
import { useHistory } from 'react-router';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Tooltip } from '@material-ui/core';
import LogoutModal from '../LogoutModal';
import { MyContext } from '../Context/MyContext';

export const Header = (props) => {
    const [modal, setModal] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState('');
    const { push } = useHistory();

    const handleSearch = () => {
        if (text.trim() !== '') {
            push('/search/' + text)
        }
    }

    const toggle = () => setModal(!modal);
    const handle = () => setOpen(!open)
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <>
                        <nav className="navbar sticky-top">
                            <div className=""
                                onClick={() => {
                                    console.log('hi')
                                    props.setClose(!props.close)
                                }}>
                                <MenuIcon className='hIcon' />
                            </div>
                            <a className="navbar-brand" onClick={
                                () => push('/home')
                            }><img src="https://streamingwars.com/wp-content/uploads/2020/02/Screenshot-2020-02-15-at-22.12.47.png" className='yImg ml-4' alt="" /></a>
                            <ul className="navbar-nav mr-auto ml-auto">
                                <div className="row">
                                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='navbarinput form-control' placeholder='Search' />
                                    <div className="srch" onClick={handleSearch}>
                                        <SearchIcon className='sIcon' />
                                    </div>
                                </div>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <div className="row">
                                    <li className="nav-item pr-5 itemsUl">
                                        <AppsIcon className='hIcon' />
                                    </li>
                                    <li className="nav-item pr-5 itemsUl">
                                        <NotificationsIcon className='hIcon' />
                                    </li>
                                    <li className="nav-item pr-5 avatar">
                                        <Tooltip title={(value[0].user !== null) ? 'Account' : 'Login '}>
                                            <AccountCircleIcon className='hIcon'
                                                onClick={() => {
                                                    if (value[0].user !== null) push('/library')
                                                    else setModal(!modal)
                                                }} />
                                        </Tooltip>
                                    </li>
                                    {(value[0].user === null) ? null :
                                        <li className="nav-item pr-5 avatar">
                                            <Tooltip title='Log-Out'>
                                                <ExitToAppIcon className='hIcon'
                                                    onClick={() => {
                                                        setOpen(!open)
                                                    }} />
                                            </Tooltip>
                                        </li>}
                                </div>
                            </ul>
                        </nav>
                        <Login modal={modal} toggle={toggle} />
                        <LogoutModal modal={open} toggle={handle} />
                    </>
                )
            }}
        </MyContext.Consumer>
    )
}


