import React from 'react'
import { Modal, ModalBody, Button, ModalFooter } from 'reactstrap';
const AlertModal = (props) => {
    return (

        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalBody>
                    <div className="container">
                        <div className="row justify-content-center m-5">
                            <div className="col-sm-12">
                                <p className="text-center h6">
                                    {/* Please Login / SignUp to access this */}
                                    {props.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={props.toggle}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default AlertModal