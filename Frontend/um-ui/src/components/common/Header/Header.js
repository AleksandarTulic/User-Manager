import { useContext, useEffect, useState } from 'react';
import './Header.css';
import { MyContext } from '../../../MyContext';

function Header(){
    const [flagVisability, setFlagVisability] = useState('');
    const [buttonStyle, setButtonStyle] = useState('');
    const {flagShow, setFlagShow} = useContext(MyContext);

    function showHideSidebar(){
        setFlagVisability(flagVisability === '' ? 'sidebar-none' : '');

        if (flagVisability !== ''){
            
            setButtonStyle('sidebar-button-disabled');
        
            setTimeout(() => {
                setButtonStyle('');
            }, 500);
        }
    }

    useEffect(() => {
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

    function increaseValue(){
        setFlagShow(flagShow + 1);
    }

    return (
        <div id='sidebar' className={flagVisability}>
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

            <button onClick={increaseValue}>
                ASD
            </button>
        </div>
    );
}

export default Header;
