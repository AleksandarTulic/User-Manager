import './RoleUpdateModal.css';

function RoleUpdateMpdal(){
    return (
        <div ref={modalRef} className="modal modal-lg" id="role-update-modal">
            <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">

                    <div className="modal-header d-flex justify-content-end">
                        <h4 className="modal-title flex-grow-1">{props.selectedUser.first_name + " " + props.selectedUser.last_name}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body d-flex">
                    </div>
                </div>
            </div>
        </div>
    );
}