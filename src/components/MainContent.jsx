import './CSS/Utility.css'
import './CSS/MainContent.css'
import Hero from './Hero'
import About from './About'
import Project from './Project'
import Contact from './Contact'

const MainContent = () => {
  return (
    <main>
      <Hero/>   
      <div className='container space'></div>
      <About/>
      <div className='container space'></div>
      <Project/>
      <div className='container space'></div>
      <Contact/>
    </main>
  )
}

export default MainContent