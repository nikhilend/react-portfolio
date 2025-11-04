import { useEffect, useRef, useState } from 'react'
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
    fetch("../../Data/Projects.json").then(res => res.json()).then(data => setProjectData(data)).catch(
    err => console.error("Error loading projects:", err)
    );  

},[])

const cords = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
})

function handleInsert(type) {

    let obj
    const id = projectData[projectID].elements.length + 1;

    switch(type) {
        case "E":
            obj = {
            id: id,
            heading: "Heading",
            type: "Text",
            content : "this is staement 1"
            
        }
            break;
        case "I":
            obj = {
            id: id,
            type: "Image",
            src: "https://www.geckoboard.com/uploads/Digital-dashboard-example.png"
        }
            break;
        case "D":
            obj = {
            id: id,
            head1: "Head 1",
            head2: "Head 2",
            type: "Difference",
            contentLeft : ["this is staement 1","this is statement 2"],
            contentRight : ["this is staement 1","this is statement 2"]
        }
            break;
        
    }

    // Clone array if `project` is an array, otherwise clone object
    const proj = Array.isArray(projectData) ? [...projectData] : { ...projectData };
    let currentProject = { ...proj[projectID] }; // copy the object
    let newElements = [...currentProject.elements]; // copy the elements array

    // insert the new object immutably
    if (inFocusElement === 999) {
    newElements.splice(0, 0, obj);
    setInFocusElement(0);
    } else {
    newElements.splice(inFocusElement + 1, 0, obj);
    setInFocusElement(inFocusElement + 1);
    }

    // assign new elements array back
    currentProject.elements = newElements;

    // put updated project back into list
    proj[projectID] = currentProject;

    // finally set state
    setProjectData(proj);
    

}

function handleRemove() {
    const proj = Array.isArray(projectData) ? [...projectData] : { ...projectData };
    let currentProject = { ...proj[projectID] }; // copy the object
    let newElements = [...currentProject.elements]; // copy the elements array

     if(inFocusElement >= 0 && inFocusElement < newElements.length)
     {
        newElements.splice(inFocusElement , 1)
     }

     // assign new elements array back
    currentProject.elements = newElements;

    // put updated project back into list
    proj[projectID] = currentProject;

    // finally set state
    setProjectData(proj);
}

function handleSave() {

    const fs = require('fs');
    // Convert JS object → JSON string
    const jsonData = JSON.stringify(projectData, null, 2);

    // Save to a file
    fs.writeFileSync('../../Data/Projects.json', jsonData, 'utf-8');
}

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
        
        <ul  className={viewEditTool? "edit-menu" : "make-invisible"}>
            <li className='menu-item' onClick={()=> {setViewInsertMenu(!viewInsertmenu)}}>
            Insert

                <ul className={viewInsertmenu? 'edit-insert-menu': 'make-invisible'}>
                    <li onClick={()=> {handleInsert("E")}}>
                        InsertE
                    </li>
                    <li onClick={()=> {handleInsert("I")}}>
                        InsertI
                    </li>
                    <li onClick={()=> {handleInsert("D")}}>
                       InsertD
                    </li>
                </ul>

            </li>
            <li className='menu-item' onClick={handleRemove}>Remove</li>
            <li className='menu-item' onClick={handleSave}>Save</li>
        </ul>

        <ProjectMain project={projectData} setProjectData={setProjectData} prjIdx = {0} inFocusElement = {inFocusElement} setInFocusElement = {setInFocusElement} />
        
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