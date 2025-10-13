import React, { useEffect, useRef, useState } from 'react'
import './CSS/Utility.css'
import './CSS/ProjectDetails.css'
import { useContext } from 'react';
import {EditContext} from '../Utils/UserContext'
import ProjectMain from './ProjectMain';

const ProjectDetails = () => {
const myRef = useRef(null);
const dragBar = useRef(null);
const myContainer = useRef(null);
const isClicked = useRef(false);
const [viewEditTool, setViewEditTool] = useContext(EditContext);

const cords = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
})


useEffect(() => {

   const div = myRef.current;
   const container = myContainer.current;
   const dragableBar = dragBar.current;

   const onMouseDown = (e) => {
        isClicked.current = true;
        cords.current.x = e.clientX;
        cords.current.y = e.clientY;
   }
   const onMouseUp = (e) => {
        isClicked.current = false;
        cords.current.lastX = div.offsetLeft;
        cords.current.lastY = div.offsetTop;
   }
   const onMouseMove = (e) => {
    if(isClicked.current){

        let nextX = e.clientX - cords.current.x + cords.current.lastX;
        let nextY = e.clientY - cords.current.y + cords.current.lastY;
        console.log(nextX, nextY)
        div.style.top = `${nextY}px`
        div.style.left = `${nextX}px`
    }
   }
    if (div) 
    {
        dragableBar.addEventListener('mousedown', onMouseDown);
        dragableBar.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove)
        container.addEventListener('onmouseleave', onMouseUp);
    }

    return (() => {onMouseDown
        if (div) {
                div.removeEventListener('mousedown', onMouseDown);
                div.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('mousemove', onMouseMove)
                container.removeEventListener('onmouseleave', onMouseUp);
            }
        })

},[])

  return (
    <div ref={myContainer} className='background'>
        <div ref={myRef} className='editing-tool-box' style={viewEditTool? {display: "block"} : {display: "none"}}>
            <div ref= {dragBar} className='dragable-bar'>
                <i className="bi bi-circle-fill edit-close" onClick={() => setViewEditTool(!viewEditTool)}></i>
            </div>
            <div className='edit-content'>

            </div>
        </div>
        <ProjectMain/>
    </div>
    
  )
}

export default ProjectDetails