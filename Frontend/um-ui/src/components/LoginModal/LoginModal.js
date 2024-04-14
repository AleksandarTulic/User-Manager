import { useState } from 'react';
import './LoginModal.css';
import { login } from '../../services/AuthenticationService';

function LoginModal(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="modal fade" id="loginModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Login</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>

                        <div>
                            <button className='btn btn-success w-100' onClick={() => login(username, password)}>
                                Login
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginModal;