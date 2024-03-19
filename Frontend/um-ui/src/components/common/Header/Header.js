import './Header.css';

function Header(){
    return (
        <div id='sidebar'>
            <div id='sidebar-header' className='row'>
                <div id='sidebar-header-title' className='col-sm-10'>
                    <h4>User Manager</h4>
                </div>
                <div className='col-sm-2'>
                    <button className='btn btn-warning' id='sidebar-button'>
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
