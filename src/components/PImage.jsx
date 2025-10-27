import './CSS/Utility.css'
import './CSS/PImage.css'
import {EditContext} from '../Utils/UserContext'
import { useContext} from 'react';

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
      const proj = [...project]; // shallow copy array
      const current = { ...proj[prjIdx] }; // copy object
      let newElements = [...current.elements]; // copy the elements array
      let newEle = {...newElements[elementIdx]}

      newEle.src = src

      newElements[elementIdx] = newEle
      current.elements = newElements
      proj[prjIdx] = current

      setProjectData(proj)
  }

  return (
    <div className='background-project'>
        <div 
        onClick={()=>{setInFocusElement(elementIdx)}}
        className={viewEditTool && elementIdx === inFocusElement ? 'container  heighlight' : "container"}>

            <div className='project-image-card'>
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