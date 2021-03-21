import React from 'react'
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
const LogoutModal = (props) => {
    const { push } = useHistory();
    const [loader, SetLoader] = React.useState(false)
    const logout = () => {
        SetLoader(!loader)
        localStorage.clear();
        push('/home');
        window.location.reload();
    }

    return (
        // <MyContext.Consumer>
        //     {(value) => {
        // return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Do you want logout ?</ModalHeader>
                <ModalBody>
                    {loader ? <div className="container pr-5 pl-5 abs">
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
                    <div className="row justify-content-center m-5">
                        <div className="col-sm-3 text-center">
                            <button className="btn btn-outline-danger" onClick={logout}>Yes</button>
                        </div>
                        <div className="col-sm-3 text-center">
                            <button className="btn btn-outline-secondary" onClick={props.toggle}>No</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
        //     )
        // }}
        // </MyContext.Consumer>
    )
}

export default LogoutModal
