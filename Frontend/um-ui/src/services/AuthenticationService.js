import { BASE_URL } from "../ProjectConsts";
import axios from "axios"

function logout(){
    localStorage.removeItem('flagLogin');
    window.location.href = '/';
}

async function login(username, password){
    try{
        let data = {
            'username': username,
            'password': password
        };

        const response = await axios.post(BASE_URL  + 'login', data);

        if (response.status !== 201){
            throw new Error('Failed.');
        }

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('flagLogin', 'true');
        localStorage.setItem('username', username);
    } catch (error) {
        console.error("Failed to create a new user.");
    }

    //reload the page
    //because i wan't other components to get the real value from localStorage
    window.location.href = '/';
}

export {login, logout}