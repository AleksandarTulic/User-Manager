import './Header.css';

function Header(){
    return (
        <div id='header'>
            <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark'>
                <a href='#' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
                    <i className="bi bi-amd" style={{fontSize: "30px"}}></i>&nbsp;&nbsp;
                    <span className="fs-4">Sidebar</span>
                </a>

                <hr />

                <ul className='nav nav-pills flex-column mb-auto'>
                    <li className='nav-item'>
                        <a href='#' className='nav-link active' aria-current='page'>
                            <i class="bi bi-house-door"></i>&nbsp;
                            Home
                        </a>
                    </li>

                    <li>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i class="bi bi-speedometer2"></i>&nbsp;
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i class="bi bi-border-all"></i>&nbsp;
                            Orders
                        </a>
                    </li>

                    <li>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i class="bi bi-house-door"></i>&nbsp;
                            Products
                        </a>
                    </li>

                    <li>
                        <a href='#' className='nav-link text-white' aria-current='page'>
                            <i class="bi bi-person-circle"></i>&nbsp;
                            Customers
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;