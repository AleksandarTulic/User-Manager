import { useEffect, useState } from 'react';
import './Role.css';

function Role(){
    const [roles, setRoles] = useState([]);

    function addRole(){
        alert('Role added');
    }

    function updateRole(){
    }

    function deleteRole(){
    }

    useEffect(() => {
        setRoles([{id: '11892-123-123123-123', name: 'Admin'},
                  {id: '11892-123-123123-123', name: 'User'},
                  {id: '11892-123-123123-123', name: 'Admin 1'},
                  {id: '11892-123-123123-123', name: 'User 1'}]);
    }, []);

    return (
        <div id='role-route row'>
            <div className='col-sm-12'>
                <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>Role Manager</h3>
            </div>
            <div className='col-sm-12'>
                <div className='um-box'>
                    <h4>Create Role</h4>

                    <div class="form-floating mb-3 d-flex">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                        <button type="button" class="btn btn-success" style={{width: '15%', marginLeft: '10px'}} onClick={addRole}>Add</button>
                    </div>
                </div>
            </div>

            <div className='col-sm-12'>
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
                                    <tr>
                                        <td valign='middle'>{item.id}</td>
                                        <td valign='middle'>{item.name}</td>
                                        <td className='d-flex justify-content-end align-items-center' style={{borderLeft: 'none', borderRight: 'none'}}>
                                            <i className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u"></i>&nbsp;
                                            <i className="bi bi-trash bg-danger text-white um-table-ud um-table-d"></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Role;
