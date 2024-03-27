import './UserList.css';
import axios from 'axios';
import { BASE_URL, PER_PAGE, PER_PAGE_MAX, PER_PAGE_MIN } from '../../ProjectConsts';
import { useEffect, useState } from 'react';

function UserList(){

    const [users, setUsers] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState([]);
    const [perPage, setPerPage] = useState(PER_PAGE);

    async function fetchData(offset = 0){
        axios.get(BASE_URL + 'users/' + offset + "/" + perPage).then(response => {
            console.log(response.data);

            setUsers(response.data);
        })
        .catch(error => {
            setUsers([]);
            console.error('Error fetching data.')
        });
    }

    async function fetchNumberOfRows(){
        axios.get(BASE_URL + 'users/count').then(response => {
            setNumberOfPages(response.data.count / perPage);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    useEffect(() => {
        fetchNumberOfRows();
    }, []);

    useEffect(() => {
        fetchData();
    }, [perPage]);

    return (
        <div className='um-box'>
            <h4>Users</h4>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Gender</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map((element) => (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.first_name}</td>
                                <td>{element.last_name}</td>
                                <td>{element.sex_id}</td>
                                <td>
                                    <div className='d-flex justify-content-end'>
                                            <i className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u"></i>
                                            &nbsp;
                                            <i className="bi bi-trash bg-danger text-white um-table-ud um-table-d"></i>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className='row mt-3 flex-row-reverse'>
                <div className='col-6 d-flex justify-content-end'>
                    <i className="bi bi-chevron-double-left p-2" style={{backgroundColor: "red"}}></i>
                    <span className='p-2 ps-3 pe-3 d-flex justify-content-center' style={{backgroundColor: "blue"}}>1</span>
                    <i class="bi bi-chevron-double-right p-2"></i>
                </div>

                <div className='col-6 d-flex justify-content-start'>
                    <span className='d-flex justify-content-center align-items-center'>Rows: </span>&nbsp;
                    <input type="number" className="form-control" placeholder="Number of rows" defaultValue={PER_PAGE} min={PER_PAGE_MIN} max={PER_PAGE_MAX} onChange={(e) => {
                        if (e.target.value < PER_PAGE_MIN && e.target.value > PER_PAGE_MAX){
                            return;
                        }

                        setPerPage(e.target.value);
                    }} style={{maxWidth: "65px"}} />
                </div>
            </div>
        </div>
    );
}

export default UserList;