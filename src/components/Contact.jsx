import {useEffect, useRef, useState} from 'react'
import './CSS/Utility.css'
import './CSS/Contact.css'
import {MONGO_FETCH_ROUTE} from '../Utils/Constants'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const emailRef = useRef();
    const [message, setMessage] = useState("")
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validMessage, setValidMessage] = useState(true);
    const navigate = useNavigate();

    async function sendContact() {
       if (!validateAll()) return

        const now = new Date();
        const dateTime = now.toLocaleString();
        const contact = {
            "id": 1,
            "name": name,
            "email": email,
            "message": message,
            "dateTime" : dateTime
        }

        try {
            const res = await fetch(MONGO_FETCH_ROUTE +"/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
            });
            
            const result = await res.json();
            console.log(result)
            if(result.success) {
                navigate("/contact")
             }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(()=> {
        if(!validateEmail(email) && email != "") {
            setValidEmail(false);
        }
        else 
        {
            setValidEmail(true)
        }
    },[email])

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const validateAll = () => {
        let valid = true;
        if(!name || name === "") {
            setValidName(false)
            valid = false
        }
        if (!validateEmail(email)) {
            setValidEmail(false)
            valid = false
        }
        if(!message || message === "") {
            setValidMessage(false)
            valid = false
        }
        return valid
    }

    useEffect(() => {
        if(name != "") {
            setValidName(true)
        }
    }, [name])

    useEffect(() => {
        if(message != "") {
            setValidMessage(true)
        }
    }, [message])
    
    return (
        <div className='contact-background-image'>
            <div className='container'>
                <div className='contact-box'>
                    <h2 id="#Contact">Contact Me</h2>
                    <div className='contact-division' >
                        <div className='contact-form-container'>                    
                            <form className='contact-form' onSubmit={(e)=> {e.preventDefault()}} >
                            {!validName && <p style={{ color: "red", fontSize:"1.5rem", textAlign : "center" }}>Please enter name</p>}
                                <div className='contact-form-name'>
                                    <h4>Name</h4> <i className="bi bi-person-fill"></i><input placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}}></input>
                                </div>
                                {!validEmail && <p style={{ color: "red", fontSize:"1.5rem", textAlign : "center" }}>Please enter valid email</p>}
                                <div ref={emailRef} className='contact-form-email'>
                                    <h4>Email</h4> <i className="bi bi-envelope-open-fill"></i> <input placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                                </div>
                                {!validMessage && <p style={{ color: "red", fontSize:"1.5rem", textAlign : "center" }}>Please enter message</p>}
                                <div className='contact-form-message'>
                                    <h4>Message</h4><textarea placeholder='message' value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
                                </div>
                                <div className='contact-form-button'>
                                    <button className='btn btn-primary' onClick={sendContact}>Send</button>
                                </div>
                            </form>
                        </div>
                        <div className='contact-view'>
                            <div className='contact-view-page'>
                                <div className='contact-view-from'>
                                    <p className='contact-page-from-label'>from </p>
                                    <p>{email}</p>
                                </div>
                                {(message!="") ? <div className='contact-view-message'>
                                    <p>{message}</p>
                                </div> : <div></div>}
                                
                                {(name!="")? 
                                <div className='contact-view-regards'>
                                    <p>Thanks & Regards,</p> 
                                    <p>{name}</p>
                                </div> : 
                                <div> </div>}
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        </div>
    )
}

export default Contact