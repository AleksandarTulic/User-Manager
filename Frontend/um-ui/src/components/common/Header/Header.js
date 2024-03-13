import './Header.css';

function Header(){
    return (
        <div id='header'>
            <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' id='asd123'>
                <a href='#' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
                    <i className="bi bi-amd" style={{fontSize: "30px"}}></i>&nbsp;&nbsp;
                    <span className="fs-4">Sidebar</span>
                </a>

                <hr />

                <ul className='nav nav-pills flex-column mb-auto'>
                    <li className='nav-item'>
                        <a href='#' className='nav-link active' aria-current='page'>
                            <i className="bi bi-house-door"></i>&nbsp;
                            Home
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i className="bi bi-person-fill-gear"></i>&nbsp;
                            Users
                        </a>
                    </li>

                    <li className='nav-item'>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i className="bi bi-gear-fill"></i>&nbsp;
                            Settings
                        </a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-menu-down"></i>&nbsp;
                            Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li className='nav-item'><a className="dropdown-item text-white" href="#">Action</a></li>
                            <li className='nav-item'><a className="dropdown-item text-white" href="#">Another action</a></li>
                            <li className='nav-item'><a className="dropdown-item text-white" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="dropdown" id="user-loged-in-container">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="user-loged-in" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">Alfred95</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
