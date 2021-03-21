import React from 'react';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AlertModal from '../AlertModal';
import { MyContext } from '../Context/MyContext';

export const Login = (props) => {
    const [mode, setMode] = React.useState(false);
    const [match, setMatch] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const { push } = useHistory();
    const [loader, SetLoader] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [text, setText] = React.useState('')
    const toggle = () => setModal(!modal);
    const handleSubmit = async (e, value) => {
        e.preventDefault();
        SetLoader(!loader)
        if (mode) {
            if (password !== cPassword) {
                setMatch(true)
                setTimeout(() => { setMatch(false) }, 1000)
            } else {
                let response = await fetch('https://damp-caverns-01669.herokuapp.com/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    })
                }).then((data) => data.json()).then((data) => {
                    console.log(data)
                    if (data.message === 'SignUp successful') {
                        alert(data.message);
                        setMode(!mode);
                    }
                    else {
                        setText(data.message);
                        toggle();
                    }
                })


            }
        } else {
            let response = await fetch('https://damp-caverns-01669.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((data) => data.json());
            console.log(response)
            if (response.code !== 'red') {
                console.log(response)
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                window.location.reload();

            } else {
                setText(response.message);
                toggle();
            }
        }
    }
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <div>
                        <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                            <ModalHeader toggle={props.toggle}>{(!mode) ? 'Login' : 'SignUp'}</ModalHeader>
                            <ModalBody>
                                {loader ? <div className="container p-5 abs">
                                    <div className="row justify-content-center pr-5">
                                        <div className="col-sm-12 text-center">
                                            <Loader
                                                type="TailSpin"
                                                color="Black"
                                                height={100}
                                                width={100} timeout={1500} />
                                        </div>
                                    </div>
                                </div> : null}
                                <form action="" onSubmit={(e) => { handleSubmit(e, value); }}>
                                    {mode ?
                                        <>
                                            <div className="row ml-2 mr-2 mb-3">
                                                <div className="col-sm-12">
                                                    <label htmlFor="username">Username</label>
                                                    <input
                                                        type="text"
                                                        id='username'
                                                        className="form-control"
                                                        value={name}
                                                        required
                                                        onChange={(e) => {
                                                            setName(e.target.value)
                                                        }} />
                                                </div>
                                            </div>
                                        </> : null}
                                    <div className="row ml-2 mr-2 mb-3">
                                        <div className="col-sm-12">
                                            <label htmlFor="email">EmailId</label>
                                            <input type="email"
                                                id='email'
                                                className="form-control"
                                                value={email}
                                                required
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }} />
                                        </div>
                                    </div>


                                    <div className="row ml-2 mr-2 mb-3">
                                        <div className="col-sm-12">
                                            <label htmlFor="password">Password</label>
                                            <input type="password"
                                                id='password'
                                                className="form-control"
                                                value={password}
                                                required
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    {mode ?
                                        <>
                                            <div className="row ml-2 mr-2 mb-3">
                                                <div className="col-sm-12">
                                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                                    <input type="password"
                                                        id='confirmPassword'
                                                        className="form-control"
                                                        value={cPassword}
                                                        required
                                                        onChange={(e) => {
                                                            setCPassword(e.target.value)
                                                        }} />
                                                </div>
                                            </div>
                                        </> : null}
                                    {(match && mode) ? <div className="row ml-2 mr-2 mb-3 mt-5">
                                        <div className="col-sm-12">
                                            <p className="text-center text-danger">Passwords didnot match</p>
                                        </div>
                                    </div> : null}
                                    <div className="row ml-2 mr-2 mb-3 mt-5">
                                        <div className="col-sm-12">
                                            <button className="btn btn-outline-danger" type='submit'>
                                                {(!mode) ? 'Login' : 'SignUp'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {(!mode) ? <p className='text-primary text'
                                            onClick={() => {
                                                props.toggle()
                                                push('/forgotpassword')
                                            }}>Forgot Password ?</p> : null}
                                    </div>
                                    <div className="row justify-content-center mt-3 mb-3">
                                        <a href="#" onClick={() => setMode(!mode)}>Switch to {(mode) ? 'Login' : 'SignUp'}</a>
                                    </div>
                                </form>
                                <AlertModal modal={modal} toggle={toggle} text={text} />
                            </ModalBody>
                        </Modal>
                    </div>
                )
            }}
        </MyContext.Consumer>
    );
}

