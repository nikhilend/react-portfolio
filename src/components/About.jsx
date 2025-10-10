import './CSS/Utility.css'
import './CSS/About.css'

const About = () => {
  return (
    <div className='container'>
    <h1 className='about-heading'>About Me</h1>
        <div className='about'>
            
            <div className='about-image'>
                <img src='src\images\fakeimage.jpg'></img>
            </div>
            <div className='about-content'>
                <p>I'm a passionate and detail-oriented software developer with 3 years of hands-on experience in building scalable, user-centric applications. My work spans across the full development lifecycle—from planning and design to implementation, testing, and maintenance.</p>
                <div className='skill-cards'>
                    <div className='skill-card'>
                        <i className="bi bi-code-slash"></i> <br/>
                        <h4>Frontend</h4>
                        <p>HTML, CSS, Javascript, React.js</p>
                    </div>
                    <div className='skill-card'>
                        <i className="bi bi-code-slash"></i> <br/>
                        <h4>Backend</h4>
                        <p>.Net, Java, Springboot, Node.js</p>
                    </div>
                    <div className='skill-card'>
                        <i className="bi bi-backpack4"></i><br/>
                        <h4>Education</h4>
                        <p>B.E in Information Technology</p>
                    </div>
                </div>
                <p className="tools-heading">Tools I use</p>
                <div className='about-tools'>
                    <div  className='about-tool'>
                        <img src="src\images\eclipse-icon-svgrepo-com.svg"></img>
                    </div>
                    <div  className='about-tool'>
                        <img src="src\images\git-svgrepo-com.svg"></img>
                    </div>
                    <div  className='about-tool'>
                        <img src="src\images\jira-svgrepo-com.svg"></img>
                    </div>
                    <div  className='about-tool'>
                        <img src="src\images\postman-icon-svgrepo-com.svg"></img>
                    </div>
                    <div  className='about-tool'>
                        <img src='src/images/visual-studio-code-svgrepo-com.svg'></img>
                    </div>
                    <div  className='about-tool'>
                        <img src='src\images\visual-studio-svgrepo-com.svg'></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About