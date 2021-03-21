import React from 'react'
import { useHistory } from 'react-router';
import update from './UpdateMethod/update'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MyContext } from './Context/MyContext';
import Loader from 'react-loader-spinner';
import AlertModal from './AlertModal';
const AddToPlayListModal = (props) => {

    const [opt, setOption] = React.useState('');
    const [loader, SetLoader] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [text, setText] = React.useState('');

    const toggle = () => setModal(!modal);

    const handleSubmit = async (e, user, video) => {
        e.preventDefault();
        SetLoader(!loader)
        const usr = { ...user };
        let playlist = user.playlists[opt];
        let flag = false;
        for (let i in playlist) {
            if (playlist[i].id.videoId === video.id.videoId) {
                flag = true;
                break;
            }
        }
        if (flag) {
            setText('Video already exists in this playlist');
            toggle();
        } else {
            usr.playlists[opt].push(video)
            let response = await update.update(usr);
            console.log(response);
            if (response.code === 'green') {
                setText('Video added successfully to this playlist');
                toggle();
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                setText(response.message);
                toggle();
            }
        }
    }
    return (
        <MyContext.Consumer>
            {(value) => {
                const user = value[0].user;
                if (user) {
                    return (
                        <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                            <ModalHeader toggle={props.toggle}>Add to PlayList</ModalHeader>
                            <ModalBody>
                                {loader ? <div className="container pr-5 pl-5 abs">
                                    <div className="row justify-content-center pt-3 pr-5">
                                        <div className="col-sm-12 text-center">
                                            <Loader
                                                type="TailSpin"
                                                color="Black"
                                                height={100}
                                                width={100} />
                                        </div>
                                    </div>
                                </div> : null}
                                <form action="" onSubmit={(e) => handleSubmit(e, value[0].user, props.video)}>
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-sm-6">
                                            <label htmlFor="playlist">PlayList</label>
                                            <select name="playlist" id="playlist" className="form-control"
                                                onChange={(e) => setOption(e.target.value)}
                                                required>
                                                <option value="">--Select-Playlist--</option>
                                                {Object.keys(user.playlists).map((i, index) => {
                                                    return (
                                                        <option value={i}>{i}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mb-5 mt-3">
                                        <div className="col-sm-6 mt-3 text-center">
                                            <button className="btn btn-outline-danger" type='submit'>Add</button>
                                        </div>
                                    </div>
                                </form>
                                <AlertModal modal={modal} toggle={toggle} text={text} />
                            </ModalBody>
                        </Modal>
                    )
                }
            }}
        </MyContext.Consumer>
    )
}

export default AddToPlayListModal
