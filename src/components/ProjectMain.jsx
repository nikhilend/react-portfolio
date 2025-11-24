import "./CSS/Utility.css"
import "./CSS/ProjectMain.css"
import { useContext, useRef } from 'react';
import {EditContext} from '../Utils/UserContext'
import { useDispatch } from 'react-redux';
import { setProjectData } from '../Utils/projectsSlice'
import { Link } from "react-router-dom";

const ProjectMain = ({project, prjIdx, setInFocusElement}) => {
    
    const headingRef = useRef();
    const descRef = useRef();
    const dispatch = useDispatch();

    let projectHeading
    let projectDescription
    let mainImageSrc = project[prjIdx]?.mainPage?.src;
    let liveLink = project[prjIdx]?.mainPage?.live ?? null;
    let codeLink = project[prjIdx]?.mainPage?.code ?? null;

    if(project && project.length !== 0) {
    projectHeading = project[prjIdx]?.mainPage?.projectName ?? "No Name";
    projectDescription = project[prjIdx]?.mainPage?.projectDescription ?? "No Decription";
    }

    const [viewEditTool, setViewEditTool] = useContext(EditContext)

    function handleTempSave() {
        debugger
        const proj = [...project]; // shallow copy array
        const current = { ...proj[prjIdx] }; // copy object
        const mainPage = { ...current.mainPage }; // copy nested object

        mainPage.projectName = headingRef.current.innerText;
        mainPage.projectDescription = descRef.current.innerText;
        mainPage.src = mainImageSrc;
        mainPage.live = liveLink;
        mainPage.code = codeLink;

        current.mainPage = mainPage;
        proj[prjIdx] = current;
        
        // Update state
        let updateID = current.id;
        dispatch(setProjectData({updateID , current}));
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
                        {liveLink&&<li><a href={liveLink} target="_blank">LIVE</a></li>}
                        {codeLink&&<li><a href={codeLink} target="_blank">CODE</a></li>}
                        <li onClick={() => {setViewEditTool(!viewEditTool); console.log(viewEditTool)}}>EDIT</li>
                        <li><Link to="/">HOME</Link></li>
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
                            className='project-main-description'>{projectDescription}</p>
                            
                            <div className={viewEditTool? "" : "make-invisible"}> 
                                <h3>Image : </h3><input onChange={(e)=> {mainImageSrc=e.target.value}} placeholder={mainImageSrc}></input> <br></br>
                                <h3>Live  : </h3><input onChange={(e)=> {liveLink = e.target.value}} placeholder = {liveLink}></input> <br></br>
                                <h3>code  : </h3><input onChange={(e)=> {codeLink = e.target.value}} placeholder = {codeLink}></input> <br></br>
                            </div>
                            <Link to="/" className='btn btn-project-dark'>GO BACK</Link>
                        </div>
                        <img src={project[prjIdx]?.mainPage?.src}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectMain