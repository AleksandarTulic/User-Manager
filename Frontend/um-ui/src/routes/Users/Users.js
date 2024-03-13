import './Users.css';

//Template taken from: https://dev.to/codeply/bootstrap-5-sidebar-examples-38pb

function Users(){
    return (
        <div class="col-sm-12 py-3" id="um-right">
            <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>Role Manager</h3>
            <div className='um-box'>
                <h4>Create Role</h4>

                <div class="form-floating mb-3 d-flex">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                    <button type="button" class="btn btn-success" style={{width: '15%', marginLeft: '10px'}}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default Users;
