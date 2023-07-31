import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000"


export async function registerUser(credentials) {
    try {
        const { data: { msg, token }, status  } = await axios.post('/api/signup', credentials)
        return {msg, status, token}

    }
    catch (error) {
        return error
    }
}

export async function loginUser(credentials){
    try {
        const {data:{msg, token}, status} = await axios.post('/api/login', credentials)
        
        return{msg, status, token}
        
    } catch (error) {
        return error
    }
}


export async function uploadTour(data){
    try{
        const token =  localStorage.getItem('token')
        const {data:{msg}, status} = await axios.post('/api/uploadtour', data, { headers: { "authorization": `Bearer ${token}` } })
        return {msg, status}
    }
    catch(error){
        return error 
    }
}
