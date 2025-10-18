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
        const proj = {...project}
        
        proj[prjInx].elements[elementIdx].heading = headingRef.current.innerText;
        proj[prjInx].elements[elementIdx].content = descRef.current.innerText;

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
            ref={headingRef}
            contentEditable = {viewEditTool}
            suppressContentEditableWarning={viewEditTool}
            className='project-content-heading'>
                {project[prjInx]?.elements[elementIdx]?.heading}
            </p>
            <p 
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