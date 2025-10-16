import "./CSS/Utility.css"
import "./CSS/ProjectMain.css"
import { useContext, useEffect, useState } from 'react';
import {EditContext} from '../Utils/UserContext'

const ProjectMain = ({project, setProjectData}) => {

const [viewEditTool, setViewEditTool] = useContext(EditContext);
console.log(project)
let projectHeading 
// = project[0].mainPage.projectName
let projectDescription
//  = project[0]?.mainPage?.projectDescription;


  return (
    <div className='project-head'>
        <div className='sliding-curve'>
            <div className='main-intial-show'>

            </div>
            <div className='sliding-curve-show'>
                <div className='container'>
                    <ul className='project-menu appear'>
                        <li>LIVE</li>
                        <li>CODE</li>
                        <li onClick={() => {setViewEditTool(!viewEditTool); console.log(viewEditTool)}}>EDIT</li>
                        <li>ABOUT</li>
                        <li>HOME</li>
                    </ul>

                    <div className='project-content'>
                        <div className='prject-titles appear'>
                            {!viewEditTool? <p className='project-content-heading'>{projectHeading}</p>
                                :
                            <input className="project-content-heading" value="DASHBOARD APP"></input>
                            }
                            
                            {!viewEditTool? <p className='project-content-description'>{projectDescription}</p>
                                : 
                                <textarea className="project-content-description" value="this is where to describe the descripiton of descriptions of descriptions"></textarea>
                            }
                            
                            <div className='btn btn-project-dark'>GO BACK</div>
                        </div>
                        <img src='src\images\project-image-sample.png'></img>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectMain