import { useEffect, useRef, useState } from 'react'
import './CSS/Utility.css'
import './CSS/ProjectDetails.css'
import { useContext } from 'react';
import {EditContext} from '../Utils/UserContext'
import ProjectMain from './ProjectMain';
import PExplanation from './PExplanation';
import PImage from './PImage';
import PDifference from './PDifference';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectData, addProjects, addNewProject, removeProject } from '../Utils/projectsSlice'
import {MONGO_FETCH_ROUTE} from '../Utils/Constants'


const ProjectDetails = () => {
const {id} = useParams()
const projectData = useSelector(store => store.projects.projects)
const dispatch = useDispatch();
const navigate = useNavigate();
// const myRef = useRef(null);
// const dragBar = useRef(null);
// const myContainer = useRef(null);
// const isClicked = useRef(false);

const [viewEditTool, setViewEditTool] = useContext(EditContext);
// const [projectData, setProjectData] = useState([]);
const [viewInsertmenu, setViewInsertMenu] = useState(false);
const [inFocusElement, setInFocusElement]  = useState(-1);
const [makeSavedVisible, setSavedVisible] = useState(false);

useEffect(()=> {

    // Logic for fetching the data
    getProjectData()
},[])

async function getProjectData() {
    let data
    if(projectData.length > 0) 
    {
        data = projectData
    } 
    else 
    {
        const rawData = await fetch(MONGO_FETCH_ROUTE +"/projects").then(data => data.json());
        data = rawData["projects"]
        dispatch(addProjects(data))
    }
}

// const cords = useRef({
//     x: 0,
//     y: 0,
//     lastX: 0,
//     lastY: 0
// })

function handleInsert(type) {
    debugger
    let obj
    const projectID = projectData[id].elements.length + 1;

    switch(type) {
        case "E":
            obj = {
            id: projectID,
            heading: "Heading",
            type: "Text",
            content : "this is staement 1"
            
        }
            break;
        case "I":
            obj = {
            id: projectID,
            type: "Image",
            src: "https://www.geckoboard.com/uploads/Digital-dashboard-example.png"
        }
            break;
        case "D":
            obj = {
            id: projectID,
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
    let currentProject = { ...proj[id] }; // copy the object
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
    proj[id] = currentProject;

    // finally set state
    dispatch(setProjectData({"updateID": currentProject.id, "current": currentProject}));
    

}

function handleRemove() {
    const proj = Array.isArray(projectData) ? [...projectData] : { ...projectData };
    let currentProject = { ...proj[id] }; // copy the object
    let newElements = [...currentProject.elements]; // copy the elements array

     if(inFocusElement >= 0 && inFocusElement < newElements.length)
     {
        newElements.splice(inFocusElement , 1)
     }

     // assign new elements array back
    currentProject.elements = newElements;

    // put updated project back into list
    proj[id] = currentProject;

    // finally set state
    dispatch(setProjectData({"updateID": currentProject.id, "current": currentProject}));
}

async function handleSave() {
    console.log(JSON.stringify(projectData[id]))
      try {
      const res = await fetch(MONGO_FETCH_ROUTE +"/project/" + projectData[id]?.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData[id]),
      });

      const result = await res.json();
      console.log("Server response:", result);
      if(result.message === "Project updated") {
        setSavedVisible(true);
        setTimeout(() => {
            setSavedVisible(false)
        },2000)
      }
    } catch (error) {
      console.error("Error:", error);
    }
}

async function handleNewProject() {
    const newProjID = projectData.length+1;
    const newProject = {
   "id": newProjID,
   "code": "",
   "live" : "",
   "mainPage" : {
    "projectName": "Dot Net Project",
    "projectDescription": "a fully fleged dot net project",
    "src": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F8billionvoices.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fsearch-image.jpg&f=1&nofb=1&ipt=6b49c2cd4579d299b17152e5e75821f19f93c965bce24642dae92d65008ba1cd"
    },
    "elements" : [
        {
            "id": 1,
            "heading": "Introduction",
            "type": "Text",
            "content" : "this is staement 1"
            
        },
        {
            "id": 2,
            "heading": "Image Heading",
            "type": "Image",
            "src" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F8billionvoices.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fsearch-image.jpg&f=1&nofb=1&ipt=6b49c2cd4579d299b17152e5e75821f19f93c965bce24642dae92d65008ba1cd"
        },
        {
            "id": 3,
            "head1": "Head 1",
            "head2": "Head 2",
            "type": "Difference",
            "contentLeft" : ["this is staement 1","this is statement 2"],
            "contentRight" : ["this is staement 1","this is statement 2"]
        }
    ]
    
    }
    
    try {
      const res = await fetch(MONGO_FETCH_ROUTE +"/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      const result = await res.json();
      console.log("Server response:", result);
      if(result.success) {
        dispatch(addNewProject(newProject))
        navigate("/project/" + (newProjID - 1))
      }
    } catch (error) {
      console.error("Error:", error);
    }
}

async function handleRemoveProject() {
    try {
      const res = await fetch(MONGO_FETCH_ROUTE +"/project/"+ projectData[id]?.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      const result = await res.json();
      console.log("Server response:", result);
      if(result.success) {
        dispatch(removeProject(projectData[id].id))
        navigate("/")
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <li className='menu-item' >{id}</li>
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
            <li className='menu-item' onClick={handleSave}>Save
               <div className={makeSavedVisible? "menu-item-saved-m" : "make-invisible"}>
                <p>saved</p>
               </div> 
            </li>
            <li className='menu-item' onClick={handleNewProject}>+ Project</li>
            <li className='menu-item' onClick={handleRemoveProject}>- Project</li>
        </ul>

        <ProjectMain project={projectData} prjIdx = {id} inFocusElement = {inFocusElement} setInFocusElement = {setInFocusElement} />
        
        {projectData[id]?.elements.map((ele, ind)=> {
            switch(ele.type) {
                case "Text":
                    return(
                         <PExplanation key={ele.id}
                        project={projectData}
                        elementIdx ={ind}
                        prjInx = {id}
                        inFocusElement = {inFocusElement}
                        setInFocusElement = {setInFocusElement}
                        />
                    )
                    break;
                case "Image":
                    return (
                        <PImage key={ele.id}
                        project={projectData} 
                        elementIdx ={ind}
                        prjInx = {id}
                        inFocusElement = {inFocusElement}
                        setInFocusElement = {setInFocusElement}
                        />
                    )
                    break;
                case "Difference":
                    return(
                        <PDifference key={ele.id} 
                        project={projectData} 
                        elementIdx ={ind}
                        prjInx = {id}
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