import {React, useState}from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth.context';
import { useContext } from 'react';

const Login = () => {

  const {login, isAuthenticated} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {email, password} = formData;

  const onChange = (e)=> setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e)=>{
    e.preventDefault();
    login(email, password)
  }

  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={onSubmit}>
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange} 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  )
}

export default Login;
