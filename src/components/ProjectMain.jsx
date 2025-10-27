import "./CSS/Utility.css"
import "./CSS/ProjectMain.css"
import { useContext, useEffect, useRef, useState } from 'react';
import {EditContext} from '../Utils/UserContext'

const ProjectMain = ({project, setProjectData, prjIdx, inFoucusElement, setInFocusElement}) => {

    const headingRef = useRef();
    const descRef = useRef();

    let projectHeading
    let projectDescription
    let mainImageSrc = project[0]?.mainPage?.src;

    if(project && project.length !== 0) {
    projectHeading = project[0]?.mainPage?.projectName ?? "No Name";
    projectDescription = project[0]?.mainPage?.projectDescription ?? "No Decription";
    }

    const [viewEditTool, setViewEditTool] = useContext(EditContext)

    function handleTempSave() {
        const proj = [...project]; // shallow copy array
        const current = { ...proj[prjIdx] }; // copy object
        const mainPage = { ...current.mainPage }; // copy nested object

        mainPage.projectName = headingRef.current.innerText;
        mainPage.projectDescription = descRef.current.innerText;
        mainPage.src = mainImageSrc;

        current.mainPage = mainPage;
        proj[prjIdx] = current;

        setProjectData(proj);
    }

  return (
    <div className='project-head'> 
        <div className='sliding-curve'>
            <div className='main-intial-show'>

            </div>
            <div className='sliding-curve-show'>
                <div 
                onBlur={handleTempSave}
                className="container">
                    <ul className='project-menu appear'>
                        <li>LIVE</li>
                        <li>CODE</li>
                        <li onClick={() => {setViewEditTool(!viewEditTool); console.log(viewEditTool)}}>EDIT</li>
                        <li>ABOUT</li>
                        <li>HOME</li>
                    </ul>

                    <div
                     className='project-content'>
                        <div 
                        onClick={() => {setInFocusElement(999)}}
                        className='project-titles appear'>
                            <p 
                            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                            contentEditable = {viewEditTool}
                            suppressContentEditableWarning={viewEditTool}
                            ref={headingRef}
                            className='project-content-heading'>{projectHeading}</p>

                            <p
                            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                            contentEditable = {viewEditTool}
                            suppressContentEditableWarning={viewEditTool} 
                            ref={descRef}
                            className='project-content-description'>{projectDescription}</p>
                            <input className={viewEditTool? "" : "make-invisible"} onChange={(e)=> {mainImageSrc=e.target.value}} placeholder={mainImageSrc}></input>
                            
                            <div className='btn btn-project-dark'>GO BACK</div>
                        </div>
                        <img src={project[0]?.mainPage?.src}></img>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectMain