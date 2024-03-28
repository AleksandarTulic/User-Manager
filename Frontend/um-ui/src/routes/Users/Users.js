import { useContext, useEffect, useRef, useState } from 'react';
import './Users.css';
import { MyContext } from '../../MyContext';
import axios from 'axios';

import { BASE_URL } from '../../ProjectConsts';
import UserList from '../../components/UserList/UserList';
import RoleUpdateModal from '../../components/common/Role_components/RoleUpdateModal/RoleUpdateModal';

//Template taken from: https://dev.to/codeply/bootstrap-5-sidebar-examples-38pb

function Users(){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const [flagShowCreateForm, setFlagShowCreateForm] = useState(true);
    const [flagShowUpdateModal, setFlagShowUpdateModal] = useState(1);
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

    async function createUser(){
        let result = validate();
        if (result !== ''){
            alert(result);
        }

        try{
            const data = {
                'username': username,
                'password': password,
                'firstName': firstName,
                'lastName': lastName,
                'genderId': genderId,
                'roles': []
            };

            const response = await axios.post(BASE_URL  + 'users', data);

            if (response.status !== 201){
                throw new Error('Failed.');
            }

            setFlagShow(flagShow + 1);

            //fetchData();

            createUserForm.current.reset();
        } catch (error) {
            console.error("Failed to create a new user.");
        }
    }

    async function retrieveGenders(){
        axios.get(BASE_URL + 'genders').then(response => {
            setGenders(response.data);
            setGenderId(response.data[0].id);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    async function retrieveRoles(){
        axios.get(BASE_URL + 'roles').then(response => {
            setRoles(response.data);
            setRole(response.data[0]);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    function validate(){
        let result = '';

        if (!username){
            result = 'Username is required.';
        }

        if (!password){
            result += 'Password is required.';
        }

        if (!firstName){
            result += 'First name is required.';
        }

        if (!lastName){
            result += 'Last name is required.';
        }

        let regexUsername = /^[A-Za-z@0-9_-]{2,100}$/;
        let regexPassword = /^[A-Za-z0-9_-]{6,60}$/;
        let regexFirstName = /^[A-Za-z]{2,100}$/;
        let regexLastName = /^[A-Za-z]{2,100}$/;

        if (!regexUsername.test(username)){
            result += 'Invalid username.';
        }

        if (!regexPassword.test(password)){
            result += 'Invalid password.';
        }

        if (!regexFirstName.test(firstName)){
            result += 'Invalid first name.';
        }

        if (!regexLastName.test(lastName)){
            result += 'Invalid last name.';
        }

        return result;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function createUserFormShowMore(){
        setFlagShowCreateForm(!flagShowCreateForm);

        createUserFormMLButton.current.classList.toggle('rotate');
    }

    useEffect(() => {
        retrieveGenders();
        retrieveRoles();
    }, []);

    return (
        <div className='row' style={{minWidth: "500px"}}>
            <form onSubmit={handleSubmit} ref={createUserForm}>
                <div class="col-sm-12 py-3" id="um-right">
                    <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>User Manager</h3>
                    <div className='um-box'>
                        <div className='row' style={{padding: "10px",paddingBottom: "0px"}}>
                            <div className='col-6'>
                                <h4>Create User</h4>
                            </div>

                            <div className='col-6 d-flex justify-content-end'>
                                <i ref={createUserFormMLButton} class="bi bi-chevron-double-down um-box-ml" onClick={() => createUserFormShowMore()}></i>
                            </div>
                        </div>

                        <div className='um-box' style={{display: flagShowCreateForm ? 'none' : 'block'}}>
                            <h6>Account info</h6>
                            <div className="form-floating mb-3 d-flex">
                                <input type="text" className="form-control" placeholder="Username" requried onChange={(e) => setUsername(e.target.value)}/>
                                <label for="floatingInput">Username</label>
                            </div>

                            <div className="form-floating mb-3 d-flex">
                                <input type="password" className="form-control" placeholder="Password" requried onChange={(e) => setPassword(e.target.value)}/>
                                <label for="floatingInput">Password</label>
                            </div>
                        </div>

                        <div className='um-box' style={{display: flagShowCreateForm ? 'none' : 'block'}}>
                            <h6>Personal info</h6>
                            <div className="form-floating mb-3 d-flex">
                                <input type="text" className="form-control" placeholder="First name" requried onChange={(e) => setFirstName(e.target.value)} />
                                <label for="floatingInput">First name</label>
                            </div>

                            <div className="form-floating mb-3 d-flex">
                                <input type="text" className="form-control" placeholder="Last name" requried onChange={(e) => setLastName(e.target.value)} />
                                <label for="floatingInput">Last name</label>
                            </div>

                            <div className="mb-3">
                                <select className='form-select' value={genderId} onChange={(e) => setGenderId(e.target.value)}>
                                    {
                                        genders.map((element) => (
                                            <option key={element.id} value={element.id}>{element.name}</option>
                                        ))
                                    }
                                </select>
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
                                        if (selectedRoles.filter(t => t.id == role.id).length >= 0){
                                            setSelectedRoles([...selectedRoles, {
                                                'id': role.id,
                                                'name': role.name
                                            }]);
                                        }
                                    }}>
                                        Add
                                    </button>
                                </div>

                                <div className='um-box' style={{margin: '0px', marginTop: '10px'}}>
                                    {
                                        selectedRoles.map((element, index) => (
                                            <span key={index} className={'p-2 user-roles ms-1'} style={{borderRadius: '10px'}}>
                                                {element.name}&nbsp;
                                                <i class="bi bi-x-circle"></i>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            }
                        </div>

                        <div className={(flagShowCreateForm ? "" : "d-flex ") + "justify-content-end"} style={{padding: "10px", paddingBottom: "0px", display: 'none'}}>
                            <button className='btn btn-success' onClick={createUser}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className='col-sm-12'>
                <UserList selectedUser={selectedForUpdate} setSelectedUser={setSelectedForUpdate} flagShowUpdate={flagShowUpdateModal} setFlagShowUpdate={setFlagShowUpdateModal} />
            </div>

            <RoleUpdateModal 
                genders={genders}
                roles={roles}
                selectedUser={selectedForUpdate} 
                flagShow={flagShowUpdateModal} 
                setFlagShow={setFlagShowUpdateModal} 
            />
        </div>
    );
}

export default Users;
