import React, { useEffect, useRef, useState } from 'react'
import './CSS/Utility.css'
import './CSS/ProjectDetails.css'
import { useContext } from 'react';
import {EditContext} from '../Utils/UserContext'
import ProjectMain from './ProjectMain';
import PExplanation from './PExplanation';
import PImage from './PImage';
import PDifference from './PDifference';

const ProjectDetails = () => {
let projectID = 0
const [isFetched, setIsFetched] = useState(false)
// const myRef = useRef(null);
// const dragBar = useRef(null);
// const myContainer = useRef(null);
// const isClicked = useRef(false);
const [viewEditTool, setViewEditTool] = useContext(EditContext);
const [projectData, setProjectData] = useState([]);
const [viewInsertmenu, setViewInsertMenu] = useState(false);
const [inFocusElement, setInFocusElement]  = useState(-1);


useEffect(()=> {
    // Logic for fetching the data
    if(!isFetched) {
            fetch("../../Data/Projects.json").then(res => res.json()).then(data => setProjectData(data)).catch(
            err => console.error("Error loading projects:", err)
        );
    }
},[])

const cords = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
})

// useEffect(() => {
//    const div = myRef.current;
//    const container = myContainer.current;
//    const dragableBar = dragBar.current;

//    const onMouseDown = (e) => {
//         debugger
//         isClicked.current = true;
//         cords.current.x = e.clientX;
//         cords.current.y = e.clientY;
//    }
//    const onMouseUp = (e) => {
//         isClicked.current = false;
//         cords.current.lastX = div.offsetLeft;
//         cords.current.lastY = div.offsetTop;
//    }
//    const onMouseMove = (e) => {
//             console.log("mousemove",true)
//     if(isClicked.current){

//         let nextX = e.clientX - cords.current.x + cords.current.lastX;
//         let nextY = e.clientY - cords.current.y + cords.current.lastY;
//         div.style.top = `${nextY}px`
//         div.style.left = `${nextX}px`
//     }
//    }
//     if (div) 
//     {
//         dragableBar.addEventListener('mousedown', onMouseDown);
//         dragableBar.addEventListener('mouseup', onMouseUp);
//         container.addEventListener('mousemove', onMouseMove)
//         dragableBar.addEventListener('onmouseleave', onMouseUp);
//     }

//     return (() => {onMouseDown
//         if (div) {
//                 dragableBar.removeEventListener('mousedown', onMouseDown);
//                 dragableBar.removeEventListener('mouseup', onMouseUp);
//                 container.removeEventListener('mousemove', onMouseMove)
//                 dragableBar.removeEventListener('onmouseleave', onMouseUp);
//             }
//         })

// },[])

//  if(!projectData || projectData.length === 0) return (<div>Loading</div>)
  return (
    <div className='background'>
        {/* <div ref={myRef} className='editing-tool-box' style={viewEditTool? {display: "block"} : {display: "none"}}>
            <div ref= {dragBar} className='dragable-bar'>
                <i className="bi bi-circle-fill edit-close" onClick={() => setViewEditTool(!viewEditTool)}></i>
            </div>
            <div className='edit-content'>

            </div>
        </div> */}
        
        <ul  className={viewEditTool? "edit-menu" : "make-invisible"} onClick={()=> {setViewInsertMenu(!viewInsertmenu)}}>
            <li className='menu-item'>
            Insert

                <ul className={viewInsertmenu? 'edit-insert-menu': 'make-invisible'}>
                    <li>
                        InsertE
                    </li>
                    <li>
                        InsertI
                    </li>
                    <li>
                       InsertD
                    </li>
                </ul>

            </li>
            <li className='menu-item'>Remove</li>
            <li className='menu-item'>Save</li>
        </ul>

        <ProjectMain project={projectData} setProjectData={setProjectData} prjIdx = {0}/>
        
        {projectData[0]?.elements.map((ele, ind)=> {
            switch(ele.type) {
                case "Text":
                    return(
                         <PExplanation key={ele.id}
                        project={projectData} 
                        setProjectData={setProjectData} 
                        elementIdx ={ind}
                        prjInx = {0}
                        inFocusElement = {inFocusElement}
                        setInFocusElement = {setInFocusElement}
                        />
                    )
                    break;
                case "Image":
                    return (
                        <PImage key={ele.id}
                        project={projectData} 
                        setProjectData={setProjectData} 
                        elementIdx ={ind}
                        prjInx = {0}
                        inFocusElement = {inFocusElement}
                        setInFocusElement = {setInFocusElement}
                        />
                    )
                    break;
                case "Difference":
                    return(
                        <PDifference key={ele.id} 
                        project={projectData} 
                        setProjectData={setProjectData} 
                        elementIdx ={ind}
                        prjInx = {0}
                        inFocusElement = {inFocusElement}
                        setInFocusElement = {setInFocusElement}
                        />
                    )
                    break;
            }
        })}
    </div>
    
  )
}

export default ProjectDetails