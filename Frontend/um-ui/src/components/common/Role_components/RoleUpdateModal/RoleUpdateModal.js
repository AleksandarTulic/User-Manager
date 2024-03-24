import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import './RoleUpdateModal';

function RoleUpdateModal(props){
    const [updateRoleName, setUpdateRoleName] = useState(null);
    const closeButtonRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (props.flag > 0){
            setUpdateRoleName(props.selectedRole);
            new Modal(modalRef.current).show();
        }
    }, [props.flag]);

    async function updateRole(){
        closeButtonRef.current.click();
        props.updateRole(props.id, updateRoleName);
    }

    return (
        <div class="modal" id="role-update-modal" ref={modalRef}>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header d-flex justify-content-end">
                        <h4 class="modal-title flex-grow-1">Role update</h4>
                        <button ref={closeButtonRef} type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body d-flex">
                        <div className="form-floating mb-3 d-flex w-100">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Admin" defaultValue={props.selectedRole} onChange={(e) => setUpdateRoleName(e.target.value)} />
                            <label>Role name</label>
                            <button type="button" className="btn btn-success" style={{width: '15%', marginLeft: '10px'}} onClick={updateRole}>Modify</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RoleUpdateModal;