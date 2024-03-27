import './UserList.css';
import axios from 'axios';
import { BASE_URL, PER_PAGE, PER_PAGE_MAX, PER_PAGE_MIN } from '../../ProjectConsts';
import { useEffect, useState } from 'react';

function UserList(){

    const [users, setUsers] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [perPage, setPerPage] = useState(PER_PAGE);

    async function fetchData(offset = 0){
        axios.get(BASE_URL + 'users/' + offset + "/" + perPage).then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            setUsers([]);
            console.error('Error fetching data.')
        });
    }

    async function fetchNumberOfRows(){
        axios.get(BASE_URL + 'users/count').then(response => {
            setNumberOfPages(Math.ceil(response.data.count / perPage));
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    function getPreviousPage(){
        setCurrPage(currPage === 1 ? 1 : currPage - 1);
    }

    function getNextPage(){
        console.log(currPage + " " + numberOfPages);
        setCurrPage(currPage === numberOfPages ? currPage : currPage + 1);
    }

    useEffect(() => {
        fetchNumberOfRows();
    }, []);

    useEffect(() => {
        fetchNumberOfRows();
        fetchData();
    }, [perPage]);

    useEffect(() => {
        setPrevPage(currPage === 1 ? null : currPage - 1);
        setNextPage(currPage === numberOfPages ? null : currPage + 1);
    }, [numberOfPages]);

    useEffect(() => {
        setPrevPage(currPage === 1 ? null : currPage - 1);
        setNextPage(currPage === numberOfPages ? null : currPage + 1);
        fetchData(perPage * (currPage - 1));
    }, [currPage]);

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
                {
                    users.length > 0 &&
                    <div className='col-6 d-flex justify-content-end'>
                        <i className={"bi bi-chevron-double-left p-2 " + (prevPage == null ? 'um-pagination-disabled' : 'um-pagination-button')} onClick={getPreviousPage}></i>
                        {
                            prevPage && <span className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>{prevPage}</span>
                        }
                        <span className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button um-pagination-active border border-0 border-top border-end border-bottom'>{currPage}</span>
                        {
                            nextPage && <span className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>{nextPage}</span>
                        }
                        <i className={"bi bi-chevron-double-right p-2 border border-0 border-top border-end border-bottom " + (nextPage == null ? 'um-pagination-disabled' : 'um-pagination-button')} onClick={getNextPage}></i>
                    </div>
                }  

                <div className={(users.length > 0 ? 'col-6' : '') + ' d-flex justify-content-start'}>
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