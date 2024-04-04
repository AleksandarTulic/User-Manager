import { useContext, useEffect, useRef, useState } from 'react';
import './Users.css';
import { MyContext } from '../../MyContext';
import UserList from '../../components/UserList/UserList';
import RoleUpdateModal from '../../components/common/Role_components/UserUpdateModal/UserUpdateModal';
import { createUser } from '../../services/UserCRUD';
import { handleSubmit } from '../../services/FormService';
import { retrieveGenders, retrieveRoles } from '../../services/UserCRUD';

//Template taken from: https://dev.to/codeply/bootstrap-5-sidebar-examples-38pb

function Users(){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const [flagShowCreateForm, setFlagShowCreateForm] = useState(true);
    const [flagShowUpdateModal, setFlagShowUpdateModal] = useState(1);
    const [refreshCount, setRefreshCount] = useState(1);
    const [selectedForUpdate, setSelectedForUpdate] = useState({});

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [role, setRole] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const [genders, setGenders] = useState([]);
    const [roles, setRoles] = useState([]);

    const createUserForm = useRef(null);
    const createUserFormMLButton = useRef(null);

    function createUserFormShowMore(){
        setFlagShowCreateForm(!flagShowCreateForm);

        createUserFormMLButton.current.classList.toggle('rotate');
    }

    useEffect(() => {
        retrieveGenders(setGenders, setGenderId);
        retrieveRoles(setRoles, setRole);
    }, []);

    return (
        <div className='row' style={{minWidth: "500px"}}>
            <form onSubmit={handleSubmit} ref={createUserForm} className='was-validated'>
                <div className="col-sm-12 py-3" id="um-right">
                    <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>User Manager</h3>
                    <div className='um-box um-box-shadow'>
                        <div className='row' style={{padding: "10px",paddingBottom: "0px"}}>
                            <div className='col-6'>
                                <h4>Create User</h4>
                            </div>

                            <div className='col-6 d-flex justify-content-end'>
                                <i ref={createUserFormMLButton} className="bi bi-chevron-double-down um-box-ml" onClick={() => createUserFormShowMore()}></i>
                            </div>
                        </div>

                        <div className='um-box' style={{display: flagShowCreateForm ? 'none' : 'block'}}>
                            <h6>Account info</h6>
                            <div className="form-floating mb-3 d-flex">
                                <input pattern='^[A-Za-z@0-9_\-]{2,100}$' type="text" className="form-control" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
                                <label>Username</label>
                            </div>

                            <div className="form-floating mb-3 d-flex">
                                <input pattern='^[A-Za-z0-9_\-]{6,60}$' type="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                                <label>Password</label>
                            </div>
                        </div>

                        <div className='um-box' style={{display: flagShowCreateForm ? 'none' : 'block'}}>
                            <h6>Personal info</h6>
                            <div className="form-floating mb-3 d-flex">
                                <input pattern='^[A-Za-z]{2,100}$' type="text" className="form-control" placeholder="First name" required onChange={(e) => setFirstName(e.target.value)} />
                                <label>First name</label>
                            </div>

                            <div className="form-floating mb-3 d-flex">
                                <input pattern='^[A-Za-z]{2,100}$' type="text" className="form-control" placeholder="Last name" required onChange={(e) => setLastName(e.target.value)} />
                                <label>Last name</label>
                            </div>

                            <div className="mb-3">
                                {
                                    genderId && <select className='form-select' value={genderId} onChange={(e) => setGenderId(e.target.value)}>
                                        {
                                            genders.map((element) => (
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
                                    <select className='form-select' value={role.id} onChange={(e) => setRole(roles.filter(t => t.id == e.target.value)[0])}>
                                        {
                                            roles.map((element) => (
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

                        <div className={(flagShowCreateForm ? "" : "d-flex ") + "justify-content-end"} style={{padding: "10px", paddingBottom: "0px", display: 'none'}}>
                            <button className='btn btn-success' onClick={() => {
                                createUser(
                                    setFlagShow,
                                    flagShow,
                                    {
                                        'username': username,
                                        'password': password,
                                        'firstName': firstName,
                                        'lastName': lastName,
                                        'genderId': genderId,
                                        'roles': selectedRoles.map(t => t.id)
                                    },
                                    setRefreshCount,
                                    refreshCount,
                                    setSelectedRoles,
                                    createUserForm
                                );
                            }}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className='col-sm-12'>
                <UserList 
                    refreshCount={refreshCount} 
                    selectedUser={selectedForUpdate} 
                    setSelectedUser={setSelectedForUpdate} 
                    flagShowUpdate={flagShowUpdateModal} 
                    setFlagShowUpdate={setFlagShowUpdateModal} 
                />
            </div>

            <RoleUpdateModal 
                genders={genders}
                roles={roles}
                selectedUser={selectedForUpdate} 
                flagShow={flagShowUpdateModal} 
                setFlagShow={setFlagShowUpdateModal}
                refreshCount={refreshCount}
                setRefreshCount={setRefreshCount}
            />
        </div>
    );
}

export default Users;
