import { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Role.css';
import { MyContext } from '../../MyContext';
import RoleUpdateModal from '../../components/common/Role_components/RoleUpdateModal/RoleUpdateModal';
import { BASE_URL } from '../../ProjectConsts';
import { validateRole } from '../../services/ValidationService';

function Role(){
    const {flagShow, setFlagShow} = useContext(MyContext);

    const [selectedRole, setSelectedRole] = useState({});
    const [flagShowUpdate, setFlagShowUpdate] = useState(1);

    const [flagShowCreateForm, setFlagShowCreateForm] = useState(true);

    const [roles, setRoles] = useState([]);
    const [createRoleName, setCreateRoleName] = useState(null);

    const createUserFormMLButton = useRef(null);

    async function addRole(){
        if (!validateRole(createRoleName)){
            //invalid role name
            setFlagShow(flagShow + 1);

            return;
        }

        try {
            const data = {
                'name': createRoleName
            };

            const response = await axios.post(BASE_URL + 'roles', data);

            if (response.status !== 201){
                throw new Error('Failed.');
            }

            setFlagShow(flagShow + 1);

            fetchData();
        } catch (error) {
            console.error("Failed to create a new role.");
        }
    }

    async function deleteRole(id){
        let flag = window.confirm("Are you sure?");
    
        if (flag){
            try{
                //delete selected role
                const response = await axios.delete(BASE_URL + 'roles/' + id);

                if (response.status !== 200){
                    throw new Error('Failed.');
                }

                setFlagShow(flagShow + 1);

                fetchData();
            } catch (error) {
                console.error("Failed to delete a role.");
            }
        }
    }

    async function fetchData(){
        axios.get(BASE_URL + 'roles').then(response => {
            setRoles(response.data);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    function createUserFormShowMore(){
        setFlagShowCreateForm(!flagShowCreateForm);

        createUserFormMLButton.current.classList.toggle('rotate');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="col-sm-12 py-3 w-100" id="body" style={{minWidth: "500px"}}>
            <form onSubmit={handleSubmit}>
                <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>Role Manager</h3>
                <div className='um-box um-box-shadow'>
                    <div className='row' style={{padding: "10px",paddingBottom: "0px"}}>
                        <div className='col-6'>
                            <h4>Create Role</h4>
                        </div>

                        <div className='col-6 d-flex justify-content-end'>
                            <i ref={createUserFormMLButton} className="bi bi-chevron-double-down um-box-ml" onClick={() => createUserFormShowMore()}></i>
                        </div>

                        <div className='col-12' style={{display: flagShowCreateForm ? 'none' : 'block'}}>
                            <div className="form-floating mb-3 d-flex">
                                <input type="text" className="form-control" id="floatingInput" placeholder="Admin" onChange={(e) => setCreateRoleName(e.target.value)} />
                                <label>Role name</label>
                                <button type="button" className="btn btn-success" style={{width: '20%', marginLeft: '10px'}} onClick={addRole}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className='um-box um-box-shadow'>
                <h4>Roles</h4>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th style={{width: '30%'}}>Id</th>
                            <th style={{width: '50%'}}>Name</th>
                            <th style={{width: '100%', borderLeft: 'none', borderRight: 'none'}} className='d-flex justify-content-end align-items-center'>&nbsp;</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            roles.map((item, index) => (
                                <tr key={index}>
                                    <td valign='middle'>{item.id}</td>
                                    <td valign='middle'>{item.name}</td>
                                    <td className='' style={{borderLeft: 'none', borderRight: 'none', textAlign: 'end'}} valign='middle'>
                                        <i className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u" onClick={() => {
                                                setSelectedRole(item);
                                                setFlagShowUpdate(flagShowUpdate + 1);
                                            }}></i>&nbsp;
                                        <i className="bi bi-trash bg-danger text-white um-table-ud um-table-d" onClick={() => deleteRole(item.id)}></i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <RoleUpdateModal 
                selectedRole={selectedRole} 
                flagShow={flagShowUpdate} 
                setFlagShow={setFlagShowUpdate} 
                fetchData={fetchData}
            />
        </div>
    );
}

export default Role;
