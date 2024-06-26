import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { logout } from '../../../services/AuthenticationService';

function Header(){
    const [flagVisability, setFlagVisability] = useState('');
    const [buttonStyle, setButtonStyle] = useState('');
    const [flagLogin, setFlagLogin] = useState();

    const homeLinkRef = useRef(null);
    const rolesLinkRef = useRef(null);
    const usersLinkRef = useRef(null);
    const accessControlTestLinkRef = useRef(null);

    function showHideSidebar(){
        setFlagVisability(flagVisability === '' ? 'sidebar-none' : '');

        if (flagVisability !== ''){
            
            setButtonStyle('sidebar-button-disabled');
        
            setTimeout(() => {
                setButtonStyle('');
            }, 500);
        }
    }

    function showActive(){
        const pathArray = window.location.pathname.split('/');
        const lastElement = pathArray[pathArray.length - 1];

        switch (lastElement){
            case 'roles':
                rolesLinkRef.current.className += ' header-link-active';
                break;
            case 'users':
                usersLinkRef.current.className += ' header-link-active';
                break;
            case 'access-control-test':
                accessControlTestLinkRef.current.className += ' header-link-active';
                break;
            default:
                homeLinkRef.current.className += ' header-link-active';
                break;
        }
    }

    useEffect(() => {
        setFlagLogin(localStorage.getItem('flagLogin'));

        showActive();

        const handleResize = () => {
            setFlagVisability(window.innerWidth >= 600 ? '' :  'sidebar-none');

            if (flagVisability !== ''){
            
                setButtonStyle('sidebar-button-disabled');
            
                setTimeout(() => {
                    setButtonStyle('');
                }, 500);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);

    return (
        <div id='sidebar' className={flagVisability}>
            <div id='sidebar-header' className='row'>
                <div className='col-sm-10 d-flex justify-content-center'>
                    &nbsp;
                </div>
                <div className='col-sm-2'>
                    <button className={'btn btn-warning ' + buttonStyle} id='sidebar-button' onClick={showHideSidebar}>
                        <i className="bi bi-list"></i>
                    </button>
                </div>
            </div>

            <div className='row' id='sidebar-header-title'>
                <div className='col-12 d-flex justify-content-center'>
                    <i className="bi bi-person-lines-fill" style={{fontSize: '50px'}}></i>
                </div>
                <div className='col-12'>
                    <h4 style={{whiteSpace: 'nowrap'}} className='d-flex justify-content-center'>User Manager</h4>
                </div>
            </div>

            <div id='sidebar-body'>
                <ul className='header-list'>
                    <li ref={homeLinkRef} className='header-link'><i className="bi bi-house-door"></i> <a href='/' style={{textDecoration: 'none', color: 'inherit'}}>Home</a></li>
                    <li ref={rolesLinkRef} className='header-link'><i className="bi bi-person-lock"></i> <a href='roles' style={{textDecoration: 'none', color: 'inherit'}}>Roles</a></li>
                    <li ref={usersLinkRef} className='header-link'><i className="bi bi-people"></i> <a href='users' style={{textDecoration: 'none', color: 'inherit'}}>Users</a></li>
                    <li ref={accessControlTestLinkRef} className='header-link'><i class="bi bi-shield-check"></i> <a href='access-control-test' style={{textDecoration: 'none', color: 'inherit'}}>Access Control Test</a></li>
                
                    {
                        flagLogin === 'true' ?
                        <li className='header-link login_logout' onClick={() => {
                            logout();
                            setFlagLogin(localStorage.getItem('flagLogin'));
                        }}>
                            <i class="bi bi-box-arrow-in-left"></i> Logout
                        </li>
                        :
                        <li className='header-link login_logout' data-bs-toggle="modal" data-bs-target="#loginModal">
                            <i class="bi bi-box-arrow-in-right"></i> Login 
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;
