import './Footer.css';

function Footer(){
    return (
        <div id="footer" className='row'>
            <div className='col-4' style={{display: 'flex', flexDirection: 'column'}}>
                <div className='row'> 
                    <h3 style={{marginTop: '20px'}}>About Us</h3>      
                </div>

                <div className='row'>       
                    <p>We are XYZ company, dedicated to providing the best service to our customers.</p>
                </div>
            </div>

            <div className='col-4' style={{display: 'flex', flexDirection: 'column'}}>
                <div className='row'> 
                    <h3 style={{marginTop: '20px'}}>Contact Us</h3>      
                </div>

                <div className='row' style={{height: '50%', display: 'flex', flexDirection: 'column'}}>       
                    <span>123 Main Street, Anytown, USA</span>
                    <span>Email: info@example.com</span>
                    <span>Phone: +1 234 567 8901</span>
                    <span>X Platform<i class="bi bi-twitter-x"></i></span>
                    <span>Facebook <i class="bi bi-facebook"></i></span>
                </div>
            </div>

            <div className='col-4'>
                Copyright © Complex Interactive {new Date().getFullYear()}
            </div>
        </div>
    );
}

export default Footer;