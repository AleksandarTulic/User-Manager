import { useEffect } from 'react';
import './AccessControlTest.css';
import { checkAccess } from '../../services/AccessControlService';

function AccessControlTest(){

    useEffect(() => {
        let flag = checkAccess();
    
        if (!flag){
            window.location.href = '/';
        }
    }, []);

    return (
        <div className="py-3 w-100 access-control-test" id="body">
            <h1>Access Control Test</h1>
        </div>
    );
}

export default AccessControlTest;