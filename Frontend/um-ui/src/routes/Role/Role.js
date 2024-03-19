import { useEffect, useState } from 'react';
import axios from 'axios';
import './Role.css';

function Role(){
    const [roles, setRoles] = useState([]);
    const [createRoleName, setCreateRoleName] = useState(null);

    async function addRole(){
        try {
            const data = {
                'name': createRoleName
            };

            const response = await axios.post('http://umapi.localhost/api/roles', data);

            if (response.status === 201){
                throw new Error('Failed.');
            }

            alert('success');
        } catch (error) {
            console.error("Failed to create a new role.");
        }
    }

    function updateRole(){
    }

    function deleteRole(){
        let flag = window.confirm("Are you sure?");
    
        if (flag){
            //delete selected role
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.get('http://umapi.localhost/api/roles').then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching data.')
            });
        }

        fetchData();

        setRoles([{id: '11892-123-123123-123', name: 'Admin'},
                  {id: '11892-123-123123-124', name: 'User'},
                  {id: '11892-123-123123-122', name: 'Admin 1'},
                  {id: '11892-123-123123-121', name: 'User 1'}]);
    }, []);

    return (
        <div className="col-sm-12 py-3" id="body">
            <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>Role Manager</h3>
            <div className='um-box'>
                <h4>Create Role</h4>

                <div className="form-floating mb-3 d-flex">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Admin" onChange={(e) => setCreateRoleName(e.target.value)} />
                    <label>Role name</label>
                    <button type="button" className="btn btn-success" style={{width: '15%', marginLeft: '10px'}} onClick={addRole}>Add</button>
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
                                        <i className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u" onClick={updateRole}></i>&nbsp;
                                        <i className="bi bi-trash bg-danger text-white um-table-ud um-table-d" onClick={deleteRole}></i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Role;
