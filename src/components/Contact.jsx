import {useState} from 'react'
import './CSS/Utility.css'
import './CSS/Contact.css'

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const[message, setMessage] = useState("");

  let test = ""

  return (
    <div className='contact-background-image'>
        <div className='container'>
            <div className='contact-box'>
                <h2>Contact Me</h2>
                <div className='contact-division'>
                    <div className='contact-form-container'>
                    
                        <form className='contact-form'>
                            <div className='contact-form-name'>
                                <h4>Name</h4> <i className="bi bi-person-fill"></i><input placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}}></input>
                            </div>

                            <div className='contact-form-email'>
                                <h4>Email</h4> <i className="bi bi-envelope-open-fill"></i> <input placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                            </div>
                            
                            <div className='contact-form-message'>
                                <h4>Message</h4><textarea placeholder='message' value={message} onChange={(e) => {setMessage(e.target.value)}}></textarea>
                            </div>
                            <div className='contact-form-button'>
                                <button className='btn btn-primary'>Send</button>
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
                                {/* <p>Hi Nikhil,</p>  */}
                                <p>{message}</p>
                            </div> : <div></div>}
                            
                            {(name!="")? 
                            <div className='contact-view-regards'>
                                <p>Thanks & Regards,</p> 
                                <p>{name}</p>
                            </div> : 
                            <div> </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <input onChange={(e)=> {test = e.target.value}}></input> <button onClick={()=> {console.log("button", test)}}>Test</button>
    </div> 
    </div>
  )
}

export default Contact