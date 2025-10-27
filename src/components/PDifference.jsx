import './CSS/Utility.css'
import './CSS/PDifference.css'
import {EditContext} from '../Utils/UserContext'
import { useContext, useEffect, useRef, useState } from 'react';


const PDifference = ({project, 
    setProjectData, 
    elementIdx, 
    prjInx,
    inFocusElement,
    setInFocusElement
}) => {

  const head1Ref = useRef()
  const head2Ref = useRef()
  const leftRef = useRef()
  const rightRef = useRef()

  const [viewEditTool, setViewEditTool] = useContext(EditContext)

    function handleTempSave() {
        // Clone array if project is an array, else clone object
        const proj = Array.isArray(project) ? [...project] : { ...project };

        // Copy the specific project
        const projectCopy = { ...proj[prjInx] };

        // Copy the elements array
        const elementsCopy = [...projectCopy.elements];

        // Copy the target element
        const elementCopy = { ...elementsCopy[elementIdx] };

        // Update element fields
        elementCopy.head1 = head1Ref.current.innerText;
        elementCopy.head2 = head2Ref.current.innerText;
        elementCopy.contentLeft = leftRef.current.innerText.split("\n");
        elementCopy.contentRight = rightRef.current.innerText.split("\n");

        // Put it all back together immutably
        elementsCopy[elementIdx] = elementCopy;
        projectCopy.elements = elementsCopy;
        proj[prjInx] = projectCopy;

        // Finally update React state
        setProjectData(proj);
    }

    function handleInsertRemove(action, dir) {
        // Clone array if project is an array, else clone object
        const proj = Array.isArray(project) ? [...project] : { ...project };

        // Copy the specific project
        const projectCopy = { ...proj[prjInx] };

        // Copy the elements array
        const elementsCopy = [...projectCopy.elements];

        // Copy the target element
        const elementCopy = { ...elementsCopy[elementIdx] };

        switch(action) {
            case "I":
                if(dir==="R"){
                     elementCopy.contentRight.push("this is new statement")
                }
                if(dir==="L"){
                     elementCopy.contentLeft.push("this is new statement")
                }
                break;
            case "R":
                if(dir==="R"){
                     elementCopy.contentRight.pop()
                }
                if(dir==="L"){
                     elementCopy.contentLeft.pop()
                }
                break;
        }

        elementsCopy[elementIdx] = elementCopy
        projectCopy.elements = elementsCopy;
        proj[prjInx] = projectCopy;

        // Finally update React state
        setProjectData(proj);

    }

  return (
    <div className='background-project'>
        <div className='gap'></div>
        <div onClick={()=>{setInFocusElement(elementIdx)}}
        onBlur={handleTempSave}
        className={viewEditTool && elementIdx === inFocusElement ? 'container difference-container  heighlight' : "container difference-container"}>

            <div className='difference-card'>
                <ul className='difference-top'>
                    <li className={viewEditTool? '' : 'make-invisible'}
                    onClick={() => {handleInsertRemove("I","L")}}
                    >LI</li>
                    <li className={viewEditTool? '' : 'make-invisible'}
                    onClick={() => {handleInsertRemove("R","L")}}
                    >LR</li>
                    <li className={viewEditTool? '' : 'make-invisible'}
                    onClick={() => {handleInsertRemove("R","R")}}
                    >RR</li>
                    <li className={viewEditTool? '' : 'make-invisible'}
                    onClick={() => {handleInsertRemove("I","R")}}
                    >RI</li>
                </ul>
                <div className='difference-container'>
                    <div className='difference-content'>
                        <div>
                            <p className='project-content-heading'
                            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                            ref={head1Ref}
                            contentEditable = {viewEditTool}
                            suppressContentEditableWarning={viewEditTool}
                            >{project[prjInx]?.elements[elementIdx]?.head1}</p>
                            <ul
                            ref={leftRef}
                             className='difference-content-left'>
                            {
                                project[prjInx]?.elements[elementIdx]?.contentLeft.map((txt,idx) => {
                                    return(<li key={idx} className='project-content-description'
                                    style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                                    contentEditable = {viewEditTool}
                                    suppressContentEditableWarning={viewEditTool}
                                    >{txt}</li>)
                                }) 
                            }
                            </ul>
                        </div>
                    
                        <div>
                            <p className='project-content-heading'
                            style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                            ref={head2Ref}
                            contentEditable = {viewEditTool}
                            suppressContentEditableWarning={viewEditTool}
                            >{project[prjInx]?.elements[elementIdx]?.head2}</p>
                            <ul 
                            ref={rightRef}
                            className='difference-content-right'>
                                {
                                project[prjInx]?.elements[elementIdx]?.contentRight.map((txt,idx) => {
                                    return(<li key={idx} className='project-content-description'
                                    style={{ whiteSpace: "pre-wrap" }}  // preserves \n and spaces visually
                                    contentEditable = {viewEditTool}
                                    suppressContentEditableWarning={viewEditTool}
                                    >{txt}</li>)
                                }) 
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='gap'></div>
    </div>
  )
}

export default PDifference