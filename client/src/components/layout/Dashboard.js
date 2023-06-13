import React from 'react'
import { useContext, useEffect,useState } from 'react'
import AuthContext from '../../context/auth.context'
import Spinner from './Spinner';

export default function Dashboard() {
    const {contact, isloading, contactData, deleteContact} = useContext(AuthContext);

    const [isDeleted, setIsDeleted] = useState(false);
    
    useEffect(()=>{
      contact();
    },[])

    useEffect(()=>{
      if(isDeleted){
        contact();
        setIsDeleted(false)
      }
    },[isDeleted])

    if(isloading || contactData == undefined ){
      return <Spinner/>
    }

    const handleDelete = (e)=>{
      setIsDeleted(true);
      console.log(e.target.value);
      deleteContact(e.target.value)
    }

    return (
    <div className='my-6'>
      <div className="contact-container">
      {contactData.map(item =>{
        return (
          <div  key={item._id} className='my-3 card' >
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Number: {item.number}</p>
            <p>created on {new Intl.DateTimeFormat().format(new Date(item.date))}</p>
            <button className='mt-2' value={item._id} onClick={handleDelete}>Delete</button>
          </div>
        )
      })}
      </div>
    </div>
  )
}
