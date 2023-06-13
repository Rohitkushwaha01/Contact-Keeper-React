import React, { useState } from "react";
import { useContext } from "react";
import {useNavigate } from 'react-router-dom'
import AuthContext from "../../context/auth.context";

export default function AddContacts() {
  const { addContact } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: ""
  });

  const [favorite, setFavorite] = useState(false);

  let { name, email, number } = formData;

  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFavorite = (e)=>{
    setFavorite(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addContact(name, email, number, favorite);
    navigate("/dashboard");
  };


  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="number"
            name="number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="favorite">Favorite</label><br />

          <select name="favorite" id="favorite" onChange={handleFavorite} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Add" />
      </form>
    </div>
  );
}
