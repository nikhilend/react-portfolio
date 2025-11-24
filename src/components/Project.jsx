import {useState , useEffect} from 'react'
import './CSS/Utility.css'
import './CSS/Project.css'
import { addProjects } from '../Utils/projectsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MONGO_FETCH_ROUTE } from '../Utils/Constants'


const Project = () => {
    const [slideInd, setSlideInd] = useState(0);
    const [nameShow, setNameShow] = useState("");
    const [descShow, setDescShow] = useState("");
    // const [projectInfo, setProjectInfo] = useState([]);
    const projectInfo = useSelector(store => store.projects.projects)
    const dispatch = useDispatch();

    useEffect(() => {
        getProjectData() 
    },[])

    async function getProjectData() {
        let data
        if(projectInfo.length > 0) 
        {
            data = projectInfo
        } 
        else 
        {
            const rawData = await fetch(MONGO_FETCH_ROUTE +"/projects").then(data => data.json());
            data = rawData["projects"]
            dispatch(addProjects(data))
        }
      
      setNameShow(data[slideInd]?.mainPage?.projectName)
      setDescShow(data[slideInd]?.mainPage?.projectDescription)

    }
    function clickLeft() {
        setSlideInd(index => {
            
            if(index===0) index = projectInfo.length - 1;
            else index = index - 1;

            setNameShow(projectInfo[index]?.mainPage?.projectName);
            setDescShow(projectInfo[index]?.mainPage?.projectDescription);
            return index;
        })
       
    }

    function clickRight() {
        setSlideInd(index => {
            if(index=== projectInfo.length - 1) index = 0;
            else index = index + 1;
            setNameShow(projectInfo[index]?.mainPage?.projectName);
            setDescShow(projectInfo[index]?.mainPage?.projectDescription);

            return index;
        })

    
    }

    function clickDot(idx) {
        setSlideInd(idx);
        setNameShow(projectInfo[idx]?.mainPage?.projectName);
        setDescShow(projectInfo[idx]?.mainPage?.projectDescription);
    }

    
  if(projectInfo.length === 0) return null
  return (
    <div className='project-baground'>
        <div className='container' id="#Project">
            <div></div>
                <div className='projects'>
                    <h2>Projects</h2>
                    <div>
                        <div className='project-name'>
                        <h3>Name : </h3><p>{nameShow}</p>
                        </div>
                        <div className='project-description'>
                            <h3>Description : </h3><p>{descShow}</p>  
                        </div>
                    </div>
                    
                    
                    <div className='project-carousal'>
                        <div className='c-button corousal-left' onClick={clickLeft}><i className="bi bi-arrow-left"></i></div> 
                        <div className='project-carousal-images'>
                           {projectInfo.map((p) => {
                                return(
                                    <img key={p._id} className='project-card' src={p?.mainPage?.src} alt={p.alt} style={{translate : `${-100 * slideInd}%`}}></img>
                                )
                            })} 
                        </div>
                        <div className='c-button corousal-right' onClick={clickRight}><i className="bi bi-arrow-right"></i></div>
                        <div className='coursal-dots'>
                            {projectInfo.map((p,ind) => {
                                if(ind === slideInd)
                                return(<i className="bi bi-record-circle" key={p._id} ></i>)
                                else return (<i className="bi bi-circle" key={p._id} onClick={() => clickDot(ind)}></i>)
                            })}
                        </div>
                    </div>
                    <Link to={`/project/${slideInd}`} className='btn btn-primary'>View</Link>
                    
                </div>
                
            </div>
    </div>
    
  )
}

export default Project