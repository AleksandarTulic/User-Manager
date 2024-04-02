import { BASE_URL, PER_PAGE } from "../ProjectConsts";
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

async function retrieveNumberOfRows(setNumberOfPages){
    try{
        const response = await axios.get(BASE_URL + 'users/count');

        setNumberOfPages(response.data.count)
    }catch (err){
        return false;
    }

    return true;
}

export {deleteUser, retrieveNumberOfRows, retrieveUsers}