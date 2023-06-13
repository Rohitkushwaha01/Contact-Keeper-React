import React from 'react'
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth.context';
import Spinner from './Spinner';

export default function Favorites() {
    const {isloading, favoritecontactData, favoriteContacts} = useContext(AuthContext);

    useEffect(()=>{
      console.log("favorites")
      favoriteContacts();
    },[])

    if(isloading || favoritecontactData == undefined ){
      return <Spinner/>
    }

  return (
    <div className='my-6'>
    <div className="contact-container">
    {favoritecontactData.map(item =>{
      return (
        <div  key={item._id} className='my-3 card' >
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Number: {item.number}</p>
          <p>created on {new Intl.DateTimeFormat().format(new Date(item.date))}</p>
        </div>
      )
    })}
    </div>
  </div>
  )
}
