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
        const proj = {...project}
        
        proj[prjInx].elements[elementIdx].head1 = head1Ref.current.innerText
        proj[prjInx].elements[elementIdx].head2 = head2Ref.current.innerText

        project[prjInx].elements[elementIdx].contentLeft = leftRef.current.innerText.split("\n")
        project[prjInx].elements[elementIdx].contentRight = rightRef.current.innerText.split("\n")

        console.log("called")
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
                    <li className={viewEditTool? '' : 'make-invisible'}>LI</li>
                    <li className={viewEditTool? '' : 'make-invisible'}>LR</li>
                    <li className={viewEditTool? '' : 'make-invisible'}>RR</li>
                    <li className={viewEditTool? '' : 'make-invisible'}>RI</li>
                </ul>
                <div className='difference-container'>
                    <div className='difference-content'>
                        <div>
                            <p className='project-content-heading'
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
                                    contentEditable = {viewEditTool}
                                    suppressContentEditableWarning={viewEditTool}
                                    >{txt}</li>)
                                }) 
                            }
                            </ul>
                        </div>
                    
                        <div>
                            <p className='project-content-heading'
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