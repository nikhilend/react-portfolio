import './CSS/Utility.css'
import './CSS/PDifference.css'
import {EditContext} from '../Utils/UserContext'
import { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setProjectData } from '../Utils/projectsSlice'


const PDifference = ({project, 
    elementIdx, 
    prjInx,
    inFocusElement,
    setInFocusElement
}) => {

  const head1Ref = useRef()
  const head2Ref = useRef()
  const leftRef = useRef()
  const rightRef = useRef()
  const dispatch = useDispatch();

  const [viewEditTool, setViewEditTool] = useContext(EditContext)

    function handleTempSave() {
        // Clone array if project is an array, else clone object
        const proj = Array.isArray(project) ? [...project] : { ...project };

        // Copy the specific project
        const current = { ...proj[prjInx] };

        // Copy the elements array
        const elementsCopy = [...current.elements];

        // Copy the target element
        const elementCopy = { ...elementsCopy[elementIdx] };

        // Update element fields
        elementCopy.head1 = head1Ref.current.innerText;
        elementCopy.head2 = head2Ref.current.innerText;
        elementCopy.contentLeft = leftRef.current.innerText.split("\n");
        elementCopy.contentRight = rightRef.current.innerText.split("\n");

        // Put it all back together immutably
        elementsCopy[elementIdx] = elementCopy;
        current.elements = elementsCopy;
        proj[prjInx] = current;

        // Update state
        dispatch(setProjectData({"updateID":current.id, "current" :current}));
    }

    function handleInsertRemove(action, dir) {
        debugger
        // Clone array if project is an array, else clone object
        let proj = Array.isArray(project) ? [...project] : { ...project };

        // Copy the specific project
        let projectCopy = { ...proj[prjInx] };

        // Copy the elements array
        let elementsCopy = [...projectCopy.elements];

        // Copy the target element
        let elementCopy = { ...elementsCopy[elementIdx] };

        switch(action) {
            case "I":
                if(dir==="R"){
                    //  elementCopy.contentRight.push()
                     elementCopy.contentRight = [...elementCopy.contentRight, "this is new statement"]
                }
                if(dir==="L"){
                    //  elementCopy.contentLeft.push("this is new statement")
                     elementCopy.contentLeft = [...elementCopy.contentLeft, "this is new statement"]
                }
                break;
            case "R":
                if(dir==="R"){
                    //  elementCopy.contentRight.pop()
                     elementCopy.contentRight = elementCopy.contentRight.filter((item, i) => i != elementCopy.contentRight.length - 1)
                }
                if(dir==="L"){
                    //  elementCopy.contentLeft.pop()
                     elementCopy.contentLeft = elementCopy.contentLeft.filter((item, i) => i != elementCopy.contentLeft.length - 1)
                }
                break;
        }

        elementsCopy[elementIdx] = elementCopy
        projectCopy.elements = elementsCopy;
        proj[prjInx] = projectCopy;

        // Update state
        dispatch(setProjectData({"updateID":projectCopy.id, "current" :projectCopy}));

    }

  return (
    <div className='background-project'>
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