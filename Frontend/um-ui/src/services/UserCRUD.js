import { BASE_URL, PER_PAGE } from "../ProjectConsts";
import { validateUser } from './ValidationService';
import axios from "axios"

async function deleteUser(id, showNotification, reset){
    let flag = window.confirm("Are you sure?");
    
    if (flag){
        try{
            const response = await axios.delete(BASE_URL  + 'users/' + id);

            if (response.status !== 200){
                throw new Error('Failed.');
            }

            showNotification();
            reset();

            return true;
        }catch (err){
            console.error('User deletion failed.');
        }
    }

    return false;
}

async function retrieveUsers(offset = 0, perPage = PER_PAGE, setUsers){
    try{
        const response = await axios.get(BASE_URL + 'users/' + offset + "/" + perPage);

        setUsers(response.data);
    }catch (err){
        return false;
    }

    return true;
}

async function retrieveNumberOfRows(perPage, setNumberOfPages){
    try{
        const response = await axios.get(BASE_URL + 'users/count');

        setNumberOfPages(Math.ceil(response.data.count / perPage))
    }catch (err){
        return false;
    }

    return true;
}

async function retrieveGenders(setGenders, setGenderId){
    axios.get(BASE_URL + 'genders').then(response => {
        setGenders(response.data);
        setGenderId(response.data[0].id);
    })
    .catch(error => {
        console.error('Error fetching data.')
    });
}

async function retrieveRoles(setRoles, setRole){
    axios.get(BASE_URL + 'roles').then(response => {
        setRoles(response.data);
        setRole(response.data[0]);
    })
    .catch(error => {
        console.error('Error fetching data.')
    });
}

async function createUser(setFlagShow, flagShow, data, setRefreshCount, refreshCount, setSelectedRoles, createUserForm){
    if (validateUser(data['username'], data['password'], data['firstName'], data['lastName'], data['roles']) !== ''){
        //invalid role name
        setFlagShow(flagShow + 1);

        return;
    }

    try{
        const response = await axios.post(BASE_URL  + 'users', data);

        if (response.status !== 201){
            throw new Error('Failed.');
        }

        setFlagShow(flagShow + 1);
        setRefreshCount(refreshCount + 1);
        setSelectedRoles([]);

        createUserForm.current.reset();
    } catch (error) {
        console.error("Failed to create a new user.");
    }
}

async function updateUser(setFlagShow, flagShow, id, data, setRefreshCount, refreshCount, setSelectedRoles, updateUserForm){
    console.log(validateUser(data['username'], data['password'], data['firstName'], data['lastName'], data['roles']));
    console.log(data);
    if (validateUser(data['username'], data['password'], data['firstName'], data['lastName'], data['roles']) !== ''){
        //invalid role name
        setFlagShow(flagShow + 1);

        return;
    }

    console.log('nije proslo ...');

    try{
        const response = await axios.put(BASE_URL  + 'users/' + id, data);

        console.log(response);
        if (response.status !== 200){
            throw new Error('Failed.');
        }

        setFlagShow(flagShow + 1);
        setRefreshCount(refreshCount + 1);
        setSelectedRoles([]);

        updateUserForm.current.reset();
    } catch (error) {
        console.error("Failed to update a user.");
    }
}

export {deleteUser, retrieveNumberOfRows, retrieveUsers, retrieveGenders, retrieveRoles, createUser, updateUser}