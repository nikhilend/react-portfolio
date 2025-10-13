import React from 'react'
import "./CSS/Utility.css"
import "./CSS/ProjectMain.css"

const ProjectMain = () => {
  return (
    <div className='project-head'>
        <div className='sliding-curve'>
            <div className='main-intial-show'>

            </div>
            <div className='sliding-curve-show'>
                <div className='absolute-container'>
                    <ul className='project-menu'>
                        <li>Edit</li>
                        <li>About</li>
                        <li>Home</li>
                    </ul>

                    <div>
                        <h1>Project Heading</h1>
                        <p>Project Description</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectMain