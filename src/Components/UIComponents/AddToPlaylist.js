import React from 'react'
import { MyContext } from '../Context/MyContext'
import { Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AlertModal from '../AlertModal';
import AddToPlayListModal from '../AddToPlayListModal';

const AddToPlaylist = (props) => {
    const [alert, setAlert] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal)
    const change = () => setAlert(!alert);
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div onClick={() => {
                        if (value[0].user !== null) {
                            toggle()
                        } else {
                            change()
                        }
                    }}>
                        <Tooltip title="Add to playlist">
                            <Fab className='con'>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <AlertModal modal={alert} toggle={change} text={'Please Login / SignUp to access this'} />
                        <AddToPlayListModal modal={modal} toggle={toggle} video={props.video} />
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default AddToPlaylist
