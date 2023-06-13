import React, { useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../context/auth.context";


const Register = () => {

  const {register, isAuthenticated} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password: "",
  })

  const {name, email, password, password2} = formData;

  const onChange = (e)=>
    setFormData({...formData, [e.target.name]: e.target.value});
  

  const onSubmit = (e)=>{
    e.preventDefault();
    if(password !== password2){
      console.log("incorrect password");
    }else{
      register(name, email, password);
    }
  }

  if(isAuthenticated){
    return <Navigate to='/dashboard'/>
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} name="email" onChange={onChange} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};


export default Register;
