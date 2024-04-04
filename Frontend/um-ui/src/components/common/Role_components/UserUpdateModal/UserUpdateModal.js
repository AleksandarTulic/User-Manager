import { useEffect, useRef, useState, useContext } from 'react';
import { Modal } from 'bootstrap';
import './UserUpdateModal';
import { retrieveRoles, updateUser } from '../../../../services/UserCRUD';
import { MyContext } from '../../../../MyContext';

function UserUpdateModal(props){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const [flagShowUpdateForm, setFlagShowUpdateForm] = useState(true);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [rolesId, setRolesId] = useState([]);
    const [role, setRole] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const modalRef = useRef(null);
    const updateUserForm = useRef(null);
    const updateUserFormMLButton = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function updateUserFormShowMore(){
        setFlagShowUpdateForm(!flagShowUpdateForm);

        updateUserFormMLButton.current.classList.toggle('rotate');
    }

    useEffect(() => {
        if (props.flagShow > 1){
            setUsername(props.selectedUser.username);
            setFirstName(props.selectedUser.first_name);
            setLastName(props.selectedUser.last_name);

            setGenderId(props.genders.filter(t => t.name === props.selectedUser.gender).map(e => e.id)[0]);
            setSelectedRoles(props.roles.filter(t => props.selectedUser.roles.some(e => e.name === t.name)));
            setRole(props.roles[0]);

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

                                        {
                                            role && <div className="mb-3 um-box">
                                                <h5>Roles</h5>
                                                <div className='d-flex'>
                                                    <select className='form-select' value={role.id} onChange={(e) => setRole(props.roles.filter(t => t.id == e.target.value)[0])}>
                                                        {
                                                            props.roles.map((element) => (
                                                                <option key={element.id} value={element.id}>{element.name}</option>
                                                            ))
                                                        }
                                                    </select>

                                                    <button className='ms-2 btn btn-success' onClick={() => {
                                                        if (selectedRoles.filter(t => t.id == role.id).length === 0){
                                                            setSelectedRoles([...selectedRoles, {
                                                                'id': role.id,
                                                                'name': role.name
                                                            }]);
                                                        }
                                                    }}>
                                                        Select
                                                    </button>
                                                </div>

                                                <div className='um-box' style={{margin: '0px', marginTop: '10px'}}>
                                                    {
                                                        selectedRoles.map((element, index) => (
                                                            <span key={index} className={'p-2 user-roles ms-1'} style={{borderRadius: '10px'}}>
                                                                {element.name}&nbsp;
                                                                <i className="bi bi-x-circle" onClick={() => setSelectedRoles(selectedRoles.filter(i => i.id !== element.id))}></i>
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className={(flagShowUpdateForm ? "" : "d-flex ") + "justify-content-end"} style={{padding: "10px", paddingBottom: "0px", display: 'none'}}>
                                        <button className='btn btn-success' onClick={() => {
                                            updateUser(
                                                setFlagShow,
                                                flagShow,
                                                props.selectedUser.id,
                                                {
                                                    'username': username,
                                                    'password': password,
                                                    'firstName': firstName,
                                                    'lastName': lastName,
                                                    'genderId': genderId,
                                                    'roles': selectedRoles.map(t => t.id)
                                                },
                                                props.setRefreshCount,
                                                props.refreshCount,
                                                setSelectedRoles,
                                                updateUserForm
                                            )
                                        }}>
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