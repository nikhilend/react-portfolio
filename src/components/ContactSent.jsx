import React from 'react'
import './CSS/ContactSent.css'
import {Link} from 'react-router-dom'

const ContactSent = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="icon">✔</div>
        <h1>Thank You for Reaching Out!</h1>
        <p>
          I really appreciate you taking the time to contact me. 
          I’ll get back to you as soon as possible — usually within a day.
        </p>
        <Link className="home-button" to="/">Go Back</Link>

      </div>
      <footer>© {new Date().getFullYear()} Nikhil K</footer>
    </div>
  )
}

export default ContactSent