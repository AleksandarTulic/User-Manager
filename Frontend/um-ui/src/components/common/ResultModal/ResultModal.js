import { useContext, useEffect, useRef, useState } from 'react';
import './ResultModal.css';
import { MyContext } from '../../../MyContext';

import { Modal } from 'bootstrap';

function ResultModal(){
    const [arrCloseActions, setArrCloseActions] = useState([]);
    const [message, setMessage] = useState("Success.");
    const [messageType, setMessageType] = useState(1);
    const closeButtonRef = useRef(null);
    const modalRef = useRef(null);
    const {flagShow, setFlagShow} = useContext(MyContext);

    useEffect(() => {
        if (flagShow > 0){
            showModal();
        }
    }, [flagShow]);

    function showModal(){
        arrCloseActions.forEach((element) => {
            clearTimeout(element);
        });

        new Modal(modalRef.current).show();

        var timeoutObj = setTimeout(() => {
            closeButtonRef.current.click();
        }, 3300);

        setArrCloseActions([timeoutObj]);
    }

    return (
        <>
        <div class="modal" id="result-modal" ref={modalRef}>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header d-flex justify-content-end">
                        <h4 class="modal-title flex-grow-1">Result</h4>
                        
                        <div className='d-flex justify-content-end'>
                            <div class="progress blue">
                                <span class="progress-left">
                                    <span class="progress-bar"></span>
                                </span>
                                <span class="progress-right">
                                    <span class="progress-bar"></span>
                                </span>
                            </div>
                        </div>
        
                    </div>

                    <div className="modal-body d-flex">
                        <p className='flex-grow-1'>{message}</p>
                        <button ref={closeButtonRef} type="button" className={messageType == 1 ? "btn btn-success" : "btn btn-danger"} data-bs-dismiss="modal" onClick={() => new Modal(modalRef.current).hide()}>Close</button>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default ResultModal;