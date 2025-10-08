import './CSS/Utility.css'
import './CSS/Header.css'

const Header = () => {
  return (
        <header >
          <div className="container">
            <nav className='navbar'>
              <div className='navbar-logo'>
                <h1>N</h1>
              </div>

              <div>
                <ul className='navbar-left'>
                  <li>ABOUT</li>
                  <li>PROJECTS</li>
                  <li>CONTACT</li> 
                </ul>
              </div>
            </nav>              
        </div>
      </header>
      )

}

export default Header

