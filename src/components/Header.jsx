import './CSS/Utility.css'
import './CSS/Header.css'
import { useContext } from 'react';
import {EditContext} from '../Utils/UserContext'

const Header = () => {

  const [viewEditTool, setViewEditTool] = useContext(EditContext);

  function scroll(to) {
    switch(to) {
      case "About": 
        document.getElementById("#About")?.scrollIntoView({
        behavior: 'smooth'
        })
      break;
      case "Project": 
        document.getElementById("#Project")?.scrollIntoView({
        behavior: 'smooth'
        })
      break;
      case "Contact":
        document.getElementById("#Contact")?.scrollIntoView({
        behavior: 'smooth'
        })
      break;
    }

  }

  return (
        <header >
          <div className="container">
            <nav className='navbar'>
              <div className='navbar-logo'>
                <h1>N</h1>
              </div>

              <div>
                <ul className='navbar-left'>
                  <li onClick={() => setViewEditTool(!viewEditTool)}>EDIT</li>
                  <li onClick={() => scroll("About")}>ABOUT</li>
                  <li onClick={() => scroll("Project")}>PROJECTS</li>
                  <li onClick={() => scroll("Contact")}>CONTACT</li> 
                </ul>
              </div>
            </nav>              
        </div>
      </header>
      )

}

export default Header

