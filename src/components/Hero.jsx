import './CSS/Utility.css'
import './CSS/Hero.css'

const Hero = () => {
  return (
    <div className='container'>
        <div className='main-page-hero'>
          <div className='intro-hero'>
            {/* <div className='hero-image'>
            </div>   */}
            <p>Hi I am Nikhil</p> 
          </div>
          
          <h2>I AM A FULLSTACK <span>DEVELOPER</span></h2>
          <p>I am fullstack developer from india with 3 years of experience working in fullstack projects.</p>
            <ul>
              <li className='btn btn-primary'>
                contact me
              </li>
              <li className='btn btn-secondary'>
                <i className="bi bi-download"></i>   my resume
              </li>
            </ul>
        </div>
    </div>
  )
}

export default Hero