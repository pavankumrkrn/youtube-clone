import React from 'react';
import { useHistory } from 'react-router-dom';

export const ChangePassword = () => {
    const { push } = useHistory();
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const [match, setMatch] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === cPassword) {
            let response = await fetch('https://damp-caverns-01669.herokuapp.com/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email'),
                    password: password
                })
            }).then((data) => data.json());
            alert(response.message);
            if (response.code === 'green') {
                push('/login')
            }
        } else {
            setMatch(!match);
            setTimeout(() => {
                setMatch(!match)
            }, 1000)
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    <p className="h4 text-center">Change Password</p>
                </div>
                <hr />
                <div className="card-text">
                    <form action="">
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                <label htmlFor="password">New Password</label>
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
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
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
                        {(match) ? <div className="row ml-2 mr-2 mb-3 mt-5">
                            <div className="col-sm-12">
                                <p className="text-center text-danger">Passwords didnot match</p>
                            </div>
                        </div> : null}
                        <div className="row mb-3 mt-5">
                            <div className="col-sm-12 text-center">
                                <button className="btn btn-success"
                                    type='submit'
                                    onClick={(e) => { handleSubmit(e); }}>Change password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}