import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Contact Keeper</h1>
          <p className="lead">
            Create your Account and Keep all the Contacts Saved on Fully Secure Web App.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
