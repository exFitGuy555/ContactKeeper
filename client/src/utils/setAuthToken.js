//this function is placed globaly
//will set as a global value as long as there is a token passed in and placed in the localstorage ....
import axios from 'axios';

const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;