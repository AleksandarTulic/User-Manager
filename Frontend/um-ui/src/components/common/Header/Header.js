import { useRef, useState } from 'react';
import './Header.css';

function Header(){
    const [flagVisability, setFlagVisability] = useState('');
    const [buttonStyle, setButtonStyle] = useState('');
    const sidebarRef = useRef(null);

    function showHideSidebar(){
        setFlagVisability(flagVisability === '' ? 'sidebar-none' : '');

        if (flagVisability !== ''){
            
            setButtonStyle('sidebar-button-disabled');
        
            setTimeout(() => {
                setButtonStyle('');
            }, 500);
        }
    }

    return (
        <div id='sidebar' className={flagVisability} ref={sidebarRef}>
            <div id='sidebar-header' className='row'>
                <div id='sidebar-header-title' className='col-sm-10'>
                    <h4>User Manager</h4>
                </div>
                <div className='col-sm-2'>
                    <button className={'btn btn-warning ' + buttonStyle} id='sidebar-button' onClick={showHideSidebar}>
                        <i class="bi bi-list"></i>
                    </button>
                </div>
            </div>

            <div id='sidebar-body'>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
