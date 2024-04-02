import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import './UserUpdateModal';

function UserUpdateModal(props){

    const [flagShowUpdateForm, setFlagShowUpdateForm] = useState(true);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [rolesId, setRolesId] = useState([]);

    const modalRef = useRef(null);
    const updateUserForm = useRef(null);
    const updateUserFormMLButton = useRef(null);

    async function updateUser(){
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function updateUserFormShowMore(){
        setFlagShowUpdateForm(!flagShowUpdateForm);

        updateUserFormMLButton.current.classList.toggle('rotate');
    }

    useEffect(() => {
        if (props.flagShow > 1){
            setGenderId(props.selectedUser.sex_id);
            new Modal(modalRef.current).show();
        }
    }, [props.flagShow]);

    return (
        <div ref={modalRef} className="modal modal-lg" id="role-update-modal">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">

                    <div className="modal-header d-flex justify-content-end">
                        <h4 className="modal-title flex-grow-1">{props.selectedUser.first_name + " " + props.selectedUser.last_name}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body d-flex">
                        <form onSubmit={handleSubmit} ref={updateUserForm} style={{width: '100%'}}>
                            <div className="col-sm-12 py-3" id="um-right">
                                <div className='um-box um-box-shadow'>
                                    <div className='row' style={{padding: "10px",paddingBottom: "0px"}}>
                                        <div className='col-6'>
                                            <h4>Update User</h4>
                                        </div>

                                        <div className='col-6 d-flex justify-content-end'>
                                            <i ref={updateUserFormMLButton} className="bi bi-chevron-double-down um-box-ml" onClick={() => updateUserFormShowMore()}></i>
                                        </div>
                                    </div>

                                    <div className='um-box' style={{display: flagShowUpdateForm ? 'none' : 'block'}}>
                                        <h6>Account info</h6>
                                        <div className="form-floating mb-3 d-flex">
                                            <input defaultValue={props.selectedUser.username} type="text" className="form-control" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
                                            <label>Username</label>
                                        </div>

                                        <div className="form-floating mb-3 d-flex">
                                            <input type="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                                            <label>Password</label>
                                        </div>
                                    </div>

                                    <div className='um-box' style={{display: flagShowUpdateForm ? 'none' : 'block'}}>
                                        <h6>Personal info</h6>
                                        <div className="form-floating mb-3 d-flex">
                                            <input defaultValue={props.selectedUser.first_name} type="text" className="form-control" placeholder="First name" required onChange={(e) => setFirstName(e.target.value)} />
                                            <label>First name</label>
                                        </div>

                                        <div className="form-floating mb-3 d-flex">
                                            <input defaultValue={props.selectedUser.last_name} type="text" className="form-control" placeholder="Last name" required onChange={(e) => setLastName(e.target.value)} />
                                            <label>Last name</label>
                                        </div>

                                        <div className="mb-3">
                                            {
                                                genderId && <select className='form-select' value={genderId} onChange={(e) => setGenderId(e.target.value)}>
                                                    {
                                                        props.genders.map((element) => (
                                                            <option key={element.id} value={element.id}>{element.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            }
                                        </div>

                                        <div className="mb-3">
                                            <select className='form-select'>
                                                {
                                                    props.roles.map((element) => (
                                                        <option key={element.id} value={element.id}>{element.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className={(flagShowUpdateForm ? "" : "d-flex ") + "justify-content-end"} style={{padding: "10px", paddingBottom: "0px", display: 'none'}}>
                                        <button className='btn btn-success' onClick={updateUser}>
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserUpdateModal;