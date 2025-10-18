import './CSS/Utility.css'
import './CSS/PImage.css'
import {EditContext} from '../Utils/UserContext'
import { useContext, useEffect, useRef, useState } from 'react';

const PImage = ({project, 
    setProjectData, 
    elementIdx, 
    prjInx,
    inFocusElement,
    setInFocusElement
}) => {

  const [viewEditTool, setViewEditTool] = useContext(EditContext);

  let src = project[prjInx]?.elements[elementIdx]?.src


  function handleLoad() {
      let projectCopy = {...project}

      projectCopy[prjInx].elements[elementIdx].src = src

      setProjectData(projectCopy)
  }

  return (
    <div className='background-project'>
        <div 
        onClick={()=>{setInFocusElement(elementIdx)}}
        className={viewEditTool && elementIdx === inFocusElement ? 'container image-container  heighlight' : "container image-container"}>

            <div className='image-card'>
                {viewEditTool?<div> <input 
                onLoad={e => {e.target.value = src}}
                onChange={e => {src = e.target.value}}>
                </input> 
                <button onClick={handleLoad}>Load</button> </div> : <></>}
                <img src={project[prjInx]?.elements[elementIdx]?.src}></img>
            </div>
        </div>
        <div className='gap'></div>
    </div>

  )
}

export default PImage