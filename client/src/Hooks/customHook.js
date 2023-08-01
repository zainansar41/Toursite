import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000"


export async function registerUser(credentials) {
    try {
        const { data: { msg, token }, status } = await axios.post('/api/signup', credentials)
        return { msg, status, token }

    }
    catch (error) {
        return error
    }
}

export async function loginUser(credentials) {
    try {
        const { data: { msg, token }, status } = await axios.post('/api/login', credentials)

        return { msg, status, token }

    } catch (error) {
        return error
    }
}


export async function uploadTour(data) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/uploadtour', data, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    }
    catch (error) {
        return error
    }
}


export async function fetchAllTours() {
    try {
        const { data: { tours } } = await axios.get('/api/fecthalltours')
        return tours


    } catch (error) {
        return error
    }
}

export async function fetchTour(id) {
    try {
        const { data: { tour } } = await axios.get(`/api//fetchtour/${id}`)
        return tour

    } catch (error) {
        return error
    }
}

export async function ContactMessage(data) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/message', data, { headers: { "authorization": `Bearer ${token}` } })

        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function acceptOffer(id) {
    try {
        const token = localStorage.getItem('token')
        console.log(id);
        const { data: { msg }, status } = await axios.post('/api/accept',{id}, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }

    } catch (error) {
        return error
    }
}

export async function rejectTour(id) {
    try {
        const token = localStorage.getItem('token')
        console.log(id);
        const { data: { msg }, status } = await axios.post('/api/rejectTour',{id}, { headers: { "authorization": `Bearer ${token}` } })
        console.log(status);
        return { msg, status }
        
    } catch (error) {
        return error
    }
}

export async function bookNow(id){
    try {
        
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/bookNow',{id}, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function fetchAllPeople(id){
    try {
        const token = localStorage.getItem('token')
        const { data: { people }, status } = await axios.get( `/api/fetchPeople/${id}`, { headers: { "authorization": `Bearer ${token}` } })

        return {people, status}

    } catch (error) {
        return error
    }
}

export async function fetchMessage(){
    try {
        
        const token = localStorage.getItem('token')
        const { data: { messages }, status } = await axios.get('/api/fetchMessage', { headers: { "authorization": `Bearer ${token}` } })
        return { messages, status }

    } catch (error) {
        return error
    }

}

export async function seenmsg(id){
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/seenMSG',{id}, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function fetchUsers(){
    try {
        const token = localStorage.getItem('token') 
        const { data: { users }, status } = await axios.get('/api/fetchUsers', { headers: { "authorization": `Bearer ${token}` } })
        return { users, status }
    } catch (error) {
        return error
    }
}

export async function changeRole(id, role){
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/updateRole', {id, role},{ headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}