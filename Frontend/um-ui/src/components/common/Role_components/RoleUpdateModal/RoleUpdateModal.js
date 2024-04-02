import './RoleUpdateModal.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../../../ProjectConsts';
import { MyContext } from '../../../../MyContext';
import { validateRole } from '../../../../services/ValidationService';

function RoleUpdateModal(props){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    const [updateRoleName, setUpdateRoleName] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    async function updateRole(){
        if (!validateRole(updateRoleName)){
            //invalid role name
            setFlagShow(flagShow + 1);

            return;
        }

        try {
            const data = {
                'name': updateRoleName
            };

            const response = await axios.put(BASE_URL + 'roles/' + props.selectedRole.id, data);

            if (response.status !== 200){
                throw new Error('Failed.');
            }

            props.fetchData();

            closeButtonRef.current.click();

            setFlagShow(flagShow + 1);
        } catch (error) {
            console.error("Failed to update a role.");
        }
    }

    useEffect(() => {
        if (props.flagShow > 1){
            setUpdateRoleName(props.selectedRole.name);
            new Modal(modalRef.current).show();
        }
    }, [props.flagShow]);

    useEffect(() => {
        setUpdateRoleName(props.selectedRole.name);
    }, [props.selectedRole]);

    return (
        <div ref={modalRef} className="modal modal-lg" id="role-update-modal">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">

                    <div className="modal-header d-flex justify-content-end">
                        <h4 className="modal-title flex-grow-1">Role: {props.selectedRole.name}</h4>
                        <button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => new Modal(modalRef.current).hide()}></button>
                    </div>

                    {
                        updateRoleName && <div className="modal-body row">
                            <form onSubmit={handleSubmit} className='was-validated'>
                                <div className='col-12'>
                                    <div className="form-floating mb-3 d-flex">
                                        <input required pattern='^[A-Za-z]{1,}[A-Za-z0-9_\-]{1,}$' type="text" className="form-control" id="floatingInput" placeholder="Admin" value={updateRoleName} onChange={(e) => setUpdateRoleName(e.target.value)} />
                                        <label>Role name</label>
                                        <button type="button" className="btn btn-success" style={{width: '20%', marginLeft: '10px'}} onClick={updateRole}>Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RoleUpdateModal;