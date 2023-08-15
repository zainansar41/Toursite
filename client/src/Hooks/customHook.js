import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000"


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
        const { data: { msg }, status } = await axios.post('/api/accept', { id }, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }

    } catch (error) {
        return error
    }
}

export async function rejectTour(id) {
    try {
        const token = localStorage.getItem('token')
        console.log(id);
        const { data: { msg }, status } = await axios.post('/api/rejectTour', { id }, { headers: { "authorization": `Bearer ${token}` } })
        console.log(status);
        return { msg, status }

    } catch (error) {
        return error
    }
}

export async function bookNow(id) {
    try {

        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/bookNow', { id }, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function fetchAllPeople(id) {
    try {
        const token = localStorage.getItem('token')
        const { data: { people }, status } = await axios.get(`/api/fetchPeople/${id}`, { headers: { "authorization": `Bearer ${token}` } })

        return { people, status }

    } catch (error) {
        return error
    }
}
export async function fetchAllPeopleOfTour(id) {
    try {
        const token = localStorage.getItem('token')
        const { data: { people } } = await axios.get(`/api/get-people/${id}`, { headers: { "authorization": `Bearer ${token}` } })

        return { people }

    } catch (error) {
        return error
    }
}

export async function fetchMessage() {
    try {

        const token = localStorage.getItem('token')
        const { data: { messages }, status } = await axios.get('/api/fetchMessage', { headers: { "authorization": `Bearer ${token}` } })
        return { messages, status }

    } catch (error) {
        return error
    }

}

export async function seenmsg(id) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/seenMSG', { id }, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function fetchUsers() {
    try {
        const token = localStorage.getItem('token')
        const { data: { users }, status } = await axios.get('/api/fetchUsers', { headers: { "authorization": `Bearer ${token}` } })
        return { users, status }
    } catch (error) {
        return error
    }
}

export async function changeRole(id, role) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post('/api/updateRole', { id, role }, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function addReview(data, id) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post(`/api/addReview/${id}`, data, { headers: { "authorization": `Bearer ${token}` } })
        console.log(msg);
        return { msg, status }
    } catch (error) {
        return error
    }
}


export async function addHotel(data) {
    try {
        const token = localStorage.getItem('token')
        const { data: { msg }, status } = await axios.post(`/api/addHotel`, data, { headers: { "authorization": `Bearer ${token}` } })
        return { msg, status }
    } catch (error) {
        return error
    }
}

export async function fetchAllHotels() {
    try {
        
        const {data:{hotels}} = await axios.get('/api/fetchAllHotel')
        return hotels

    } catch (error) {
        return error
    }
}

export async function fetchHotel(id) {
    try {
        const {data:{hotel}} = await axios.get(`/api/fetchHotel/${id}`)
        return hotel
    } catch (error) {
        return error
    }
}

export async function updatePrice(id, price){
    try {
        const token = localStorage.getItem('token')
        const {data:{msg}} = await axios.post(`/api/updatePrice/${id}`,{price},{headers:{"authorization":`Bearer ${token}`}})
        return msg
    } catch (error) {
        return error
    }
}


export async function fetchPeopleOfHotel(id){
    try {

        const {data:{people}} = await axios.get(`/api/fetchPeopleOfHotel/${id}`)
        return {people}
        
    } catch (error) {
        return error
    }
}