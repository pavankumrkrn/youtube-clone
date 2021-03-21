import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import update from './UpdateMethod/update';
import { MyContext } from './Context/MyContext';
import Loader from 'react-loader-spinner';
import AlertModal from './AlertModal';
const NewPlaylist = (props) => {
    let [name, setName] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [text, setText] = React.useState('')

    const toggle = () => setModal(!modal);
    const handleSubmit = async (e, value) => {
        setLoader(true);
        e.preventDefault();
        let flag = false;
        for (let i in value.playlists) {
            if (i === name) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            value.playlists[name] = [];
            let user = value;
            const response = await update.update(user);
            if (response.code === 'green') {
                setText('Playlist created successfully');
                toggle();
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                setText(response.message);
                toggle();
            }
        } else {
            setText('Playlist already exists');
            toggle();
        }
        setLoader(false);

    }
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div>
                        <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                            <ModalHeader toggle={props.toggle}>Create New Playlist</ModalHeader>
                            <ModalBody>
                                {loader ? <div className="container pr-5 pl-5 abs">
                                    <div className="row justify-content-center pt-3 pr-5">
                                        <div className="col-sm-12 text-center">
                                            <Loader
                                                type="TailSpin"
                                                color="Black"
                                                height={100}
                                                width={100} timeout={1000} />
                                        </div>
                                    </div>
                                </div> : null}
                                <form action="" onSubmit={(e) => handleSubmit(e, value[0].user)}>
                                    <div className="row justify-content-center m-5">
                                        <div className="col-sm-12 text-center">
                                            <label htmlFor="name">Playlist Name</label>
                                            <input type="text" value={name} className="form-control"
                                                onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-5 mb-5">
                                        <div className="col-sm-4 text-center">
                                            <button className="btn btn-outline-danger"
                                                type='submit'
                                            >Create</button>
                                        </div>
                                    </div>
                                </form>
                                <AlertModal modal={modal} toggle={toggle} text={text} />
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default NewPlaylist
