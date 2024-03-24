import { useContext, useEffect, useState } from 'react';
import './Users.css';
import { MyContext } from '../../MyContext';
import axios from 'axios';

//Template taken from: https://dev.to/codeply/bootstrap-5-sidebar-examples-38pb

function Users(){

    const {flagShow, setFlagShow} = useContext(MyContext);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [genderId, setGenderId] = useState(null);

    const [genders, setGenders] = useState([]);

    function createUser(){
        if (validate !== ''){
            return;
        }

        try{

        } catch (error) {
        }
    }

    async function retrieveGenders(){
        axios.get('http://umapi.localhost/api/genders').then(response => {
            setGenders(response.data);
            setGenderId(response.data[0].id);
        })
        .catch(error => {
            console.error('Error fetching data.')
        });
    }

    function validate(){
        let result = '';

        if (!username){
            result = 'Username is required.';
        }

        if (!password){
            result += 'Password is required.';
        }

        if (!firstName){
            result += 'First name is required.';
        }

        if (!lastName){
            result += 'Last name is required.';
        }

        let regexUsername = /^[A-Za-z@0-9_-]{2,100}$/;
        let regexPassword = /^[A-Za-z0-9_-]{6,60}$/;
        let regexFirstName = /^[A-Za-z]{2,100}$/;
        let regexLastName = /^[A-Za-z]{2,100}$/;

        if (!regexUsername.test(username)){
            result += 'Invalid username.';
        }

        if (!regexPassword.test(password)){
            result += 'Invalid password.';
        }

        if (!regexFirstName.test(firstName)){
            result += 'Invalid first name.';
        }

        if (!regexLastName.test(lastName)){
            result += 'Invalid last name.';
        }
    }

    useEffect(() => {
        retrieveGenders();
    }, []);

    useEffect(() => {
        console.log(genderId);
    }, [genderId]);

    return (
        <div class="col-sm-12 py-3" id="um-right">
            <h3 style={{marginLeft: '10px', marginTop: '20px', marginBottom: '20px'}}>User Manager</h3>
            <div className='um-box'>
                <h4>Create User</h4>

                <div className='um-box'>
                    <h6>Account info</h6>
                    <div className="form-floating mb-3 d-flex">
                        <input type="text" className="form-control" placeholder="Username" requried/>
                        <label for="floatingInput">Username</label>
                    </div>

                    <div className="form-floating mb-3 d-flex">
                        <input type="password" className="form-control" placeholder="Password" requried />
                        <label for="floatingInput">Password</label>
                    </div>
                </div>

                <div className='um-box'>
                    <h6>Personal info</h6>
                    <div className="form-floating mb-3 d-flex">
                        <input type="text" className="form-control" placeholder="First name" requried/>
                        <label for="floatingInput">First name</label>
                    </div>

                    <div className="form-floating mb-3 d-flex">
                        <input type="text" className="form-control" placeholder="Last name" requried />
                        <label for="floatingInput">Last name</label>
                    </div>

                    <div className="mb-3">
                        <select className='form-select' value={genderId} onChange={(e) => setGenderId(e.target.value)}>
                            {
                                genders.map((element) => (
                                    <option key={element.id} value={element.id}>{element.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-end">
                    <button className='btn btn-success' onClick={createUser}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Users;
