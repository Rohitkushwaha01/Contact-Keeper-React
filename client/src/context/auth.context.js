import { createContext, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    let [isAuthenticated, setAuthenticated] = useState(false);
    let [isloading, setIsLoading] = useState(true);
    const [contactData, setContactData] = useState();
    const [favoritecontactData, setFavoriteContactData] = useState();

    let [userId, setUserId] = useState();

   useEffect(() => {
    if(localStorage.token){
        setAuthenticated(true);
        setIsLoading(false);
    }
   }, [])
   

    const register = async(name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({ name, email, password });
        console.log(body);
        try {
            const res = await axios.post('/api/user', body, config);
            localStorage.setItem('token', res.data.token);
            setAuthenticated(true);
            setIsLoading(false);
            
        }
        catch (err) {
            console.log(err);
        }
    
    }

    const login = async(email, password)=>{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        const body = JSON.stringify({email, password});

        try{
            const res = await axios.post('/api/auth/', body, config);
            localStorage.setItem('token', res.data.token);
            setAuthenticated(true);
            setIsLoading(false);
            setUserId(res.data.payload.user.id);
            return res.data;
        }
        catch(err){
            console.log(err);
        }

    }


    const contact = async()=>{
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }

        try {
            
            // Decode the token and extract the user ID
            const decodedToken = jwtDecode(token);
            const user = decodedToken.user.id;
            
            const res = await axios.get(`/api/contact/${user}`,config);
            setContactData(res.data)

            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    

    const addContact = async(name, email, number, favorite) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }
    
        favorite = Boolean(favorite);

        const body = JSON.stringify({ name, email, number,favorite });
console.log(body);
        try {
            const res = await axios.post('/api/contact/', body, config);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    
    }


    const favoriteContacts = async()=>{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        try {
            const res = await axios.get(`/api/favorites/`,config);
            setFavoriteContactData(res.data)
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContact = async(contactId)=>{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        try{
            const res = await axios.delete(`/api/contact/${contactId}`,config);

        }
        catch(errors){
            console.log(errors);
        }
    }

    const updateData = async(contactId)=>{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }

        try{
            const res = await axios.put(`/api/contact/`,config);

        }
        catch(errors){
            console.log(errors);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                register,
                login,
                contact,
                addContact,
                favoriteContacts,
                deleteContact,
                isAuthenticated,
                setAuthenticated,
                isloading,
                contactData,
                favoritecontactData
            }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;