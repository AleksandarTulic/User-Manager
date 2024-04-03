import './UserList.css';
import { PER_PAGE, PER_PAGE_MAX, PER_PAGE_MIN } from '../../ProjectConsts';
import { useEffect, useState, useContext } from 'react';
import { deleteUser, retrieveNumberOfRows, retrieveUsers } from '../../services/UserCRUD';
import { MyContext } from '../../MyContext';

function UserList(props){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const [users, setUsers] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [perPage, setPerPage] = useState(PER_PAGE);

    function getPreviousPage(){
        setCurrPage(currPage === 1 ? 1 : currPage - 1);
    }

    function getNextPage(){
        setCurrPage(currPage === numberOfPages ? currPage : currPage + 1);
    }

    function getPage(index){
        setCurrPage(index);
    }

    function resetPagination(){
        setCurrPage(1);

        if (currPage === 1){
            retrieveUsers(perPage * (currPage - 1), perPage, setUsers);
        }
    }

    useEffect(() => {
        retrieveNumberOfRows(perPage, setNumberOfPages);
    }, []);

    useEffect(() => {
        retrieveNumberOfRows(perPage, setNumberOfPages);
        retrieveUsers(perPage * (currPage - 1), perPage, setUsers);
    }, [perPage]);

    useEffect(() => {
        setPrevPage(currPage === 1 ? null : currPage - 1);
        setNextPage(currPage === numberOfPages ? null : currPage + 1);
    }, [numberOfPages]);

    useEffect(() => {
        setPrevPage(currPage === 1 ? null : currPage - 1);
        setNextPage(currPage === numberOfPages ? null : currPage + 1);
        retrieveUsers(perPage * (currPage - 1), perPage, setUsers);
    }, [currPage]);

    useEffect(() => {
        resetPagination();
    }, [props.refreshCount]);

    return (
        <div className='um-box um-box-shadow'>
            <h4>Users</h4>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Gender</th>
                        <th>Roles</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>

                <tbody>
                    {
                         Array.isArray(users) && users.map((element) => (
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.username}</td>
                                <td>{element.first_name}</td>
                                <td>{element.last_name}</td>
                                <td>{element.gender}</td>
                                <td>{element.roles.map((t, index) => t.name + (index === (element.roles.length - 1) ? '' : ', '))}</td>
                                <td>
                                    <div className='d-flex justify-content-end'>
                                            <i onClick={() => {
                                                props.setSelectedUser(element);
                                                props.setFlagShowUpdate(props.flagShowUpdate + 1);
                                            }} className="bg-warning bi bi-arrow-repeat um-table-ud um-table-u"></i>
                                            &nbsp;
                                            <i onClick={() => {
                                                deleteUser(element.id, () => setFlagShow(flagShow + 1), resetPagination);
                                            }} className="bi bi-trash bg-danger text-white um-table-ud um-table-d"></i>
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
                        prevPage > 1 && prevPage && <span onClick={() => getPage(1)} className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>1</span>
                    }
                    {
                        prevPage > 1 && prevPage && <span className='p-1'>...</span>
                    }
                    {
                        prevPage && <span onClick={() => getPage(prevPage)} className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>{prevPage}</span>
                    }
                    <span className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button um-pagination-active border border-0 border-top border-end border-bottom'>{currPage}</span>
                    {
                        nextPage && <span onClick={() => getPage(nextPage)} className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>{nextPage}</span>
                    }
                    {
                        nextPage < numberOfPages && nextPage && <span className='p-1'>...</span>
                    }
                    {
                        nextPage < numberOfPages && nextPage && <span onClick={() => getPage(numberOfPages)} className='p-2 ps-3 pe-3 d-flex justify-content-center um-pagination-button border border-0 border-top border-end border-bottom'>{numberOfPages}</span>
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