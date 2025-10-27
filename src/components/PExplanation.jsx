import React, { useContext, useRef } from 'react'
import './CSS/Utility.css'
import {EditContext} from '../Utils/UserContext'


const PExplanation = ({project, 
    setProjectData, 
    elementIdx, 
    prjInx,
    inFocusElement,
    setInFocusElement
}) => {

 const [viewEditTool, setViewEditTool] = useContext(EditContext);

    const headingRef = useRef();
    const descRef = useRef();

    function handleTempSave() {
        // Clone array if `project` is an array, otherwise clone object
        const proj = Array.isArray(project) ? [...project] : { ...project };

        // Clone the specific project
        const projectCopy = { ...proj[prjInx] };

        // Clone the elements array
        const elementsCopy = [...projectCopy.elements];

        // Clone the target element
        const elementCopy = { ...elementsCopy[elementIdx] };

        // Update properties
        elementCopy.heading = headingRef.current.innerText;
        elementCopy.content = descRef.current.innerText;

        // Rebuild everything immutably
        elementsCopy[elementIdx] = elementCopy;
        projectCopy.elements = elementsCopy;
        proj[prjInx] = projectCopy;

        // Update state
        setProjectData(proj);
    }

  return (
    <div className='background-project'>
      <div className='gap'></div>
          <div 
          onClick={()=>{setInFocusElement(elementIdx)}}
          onBlur={()=> {handleTempSave()}}
        className={viewEditTool && elementIdx === inFocusElement ? 'container  heighlight' : "container"}>
            <p
            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
            ref={headingRef}
            contentEditable = {viewEditTool}
            suppressContentEditableWarning={viewEditTool}
            className='project-content-heading'>
                {project[prjInx]?.elements[elementIdx]?.heading}
            </p>
            <p 
            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
            ref={descRef}
            contentEditable = {viewEditTool}
            suppressContentEditableWarning={viewEditTool}
            className='project-content-description'>
                {project[prjInx]?.elements[elementIdx]?.content}
            </p>
        </div>
        <div className='gap'></div>
    </div>

  )
}

export default PExplanation