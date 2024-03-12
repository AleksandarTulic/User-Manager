import { useEffect, useState } from 'react';
import './Role.css';

function Role(){
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        setRoles([{id: '11892-123-123123-123', name: 'Admin'}]);
    }, []);

    return (
        <div id='role-route'>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='um-box'>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <table className="table table-bordered table-hover">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>

                        {
                            roles.map((item, index) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Role;