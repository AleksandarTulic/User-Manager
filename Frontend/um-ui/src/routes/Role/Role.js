import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Role.css';
import { MyContext } from '../../MyContext';
import RoleUpdateModal from '../../components/common/Role_components/RoleUpdateModal/RoleUpdateModal';

function Role(){
    const [roles, setRoles] = useState([]);
    const [createRoleName, setCreateRoleName] = useState(null);
    const {flagShow, setFlagShow} = useContext(MyContext);

    const [updateId, setUpdateId] = useState(null);
    const [flagUpdateModal, setFlagUpdateModal] = useState(0);

    async function addRole(){
        console.log(validate(createRoleName) + " " + createRoleName);
        if (!validate(createRoleName)){
            //invalid role name
            setFlagShow(flagShow + 1);

            return;
        }

        try {
            const data = {
                'name': createRoleName
            };

            const response = await axios.post('http://umapi.localhost/api/roles', data);

            if (response.status !== 201){
                throw new Error('Failed.');
            }

            setFlagShow(flagShow + 1);

            fetchData();
        } catch (error) {
            console.error("Failed to create a new role.");
        }
    }

    async function updateRole(id, updateRoleName){
        if (!validate(updateRoleName)){
            //invalid role name
            setFlagShow(flagShow + 1);

            return;
        }

        try {
            const data = {
                'name': updateRoleName
            };

            const response = await axios.put('http://umapi.localhost/api/roles/' + id, data);

            if (response.status !== 200){
                throw new Error('Failed.');
            }

            setFlagShow(flagShow + 1);

            fetchData();
        } catch (error) {
            console.error("Failed to update a role.");
        }
    }

    async function deleteRole(id){
        let flag = window.confirm("Are you sure?");
    
        if (flag){
            try{
                //delete selected role
                const response = await axios.delete('http://umapi.localhost/api/roles/' + id);

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
        axios.get('http://umapi.localhost/api/roles').then(response => {
            setRoles(response.data);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    function validate(value){
        if (!value){
            return false;
        }
        
        let regex = /^[A-Za-z]{1,}[A-Za-z0-9-_]{1,}$/;
        
        return regex.test(value);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="col-sm-12 py-3" id="body">
            <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>Role Manager</h3>
            <div className='um-box'>
                <h4>Create Role</h4>

                <div className="form-floating mb-3 d-flex">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Admin" onChange={(e) => setCreateRoleName(e.target.value)} />
                    <label>Role name</label>
                    <button type="button" className="btn btn-success" style={{width: '20%', marginLeft: '10px'}} onClick={addRole}>Add</button>
                </div>
            </div>

            <div className='um-box'>
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
                                        <i className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u" onClick={() => {setFlagUpdateModal(flagUpdateModal + 1 == Number.MAX_SAFE_INTEGER ? 1 : flagUpdateModal + 1);setUpdateId(item.id)}}></i>&nbsp;
                                        <i className="bi bi-trash bg-danger text-white um-table-ud um-table-d" onClick={() => deleteRole(item.id)}></i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <RoleUpdateModal id={updateId} flag={flagUpdateModal} selectedRole={roles.filter(t => t.id == updateId)[0]?.name} updateRole={updateRole}/>
        </div>
    );
}

export default Role;
