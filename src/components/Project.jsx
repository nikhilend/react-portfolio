import {useState , useEffect} from 'react'
import './CSS/Utility.css'
import './CSS/Project.css'



const Project = () => {
    const [slideInd, setSlideInd] = useState(0);
    const [nameShow, setNameShow] = useState("");
    const [descShow, setDescShow] = useState("");
    const [projectInfo, setProjectInfo] = useState([
    {
        id: 1,
        name: ".Net Project",
        desc: "a fully fleged dot net project",
        src: "https://picsum.photos/id/1/1000",
        alt:"photo 1"
    },
    {
        id : 2,
        name: "java Project",
        desc: "a fully fleged java project",
        src: "https://picsum.photos/id/2/1000",
        alt:"photo 2"
    },
    {
        id : 3,
        name: "node Project",
        desc: "a fully fleged node project",
        src: "https://picsum.photos/id/7/1000",
        alt:"photo 3"
    }
    ,
    {
        id : 4,
        name: "express Project",
        desc: "a fully fleged express project",
        src: "https://picsum.photos/id/30/1000",
        alt:"photo 4"
    }
    ]);

    useEffect(() => {
        console.log("UseEffects",projectInfo);
        setNameShow(projectInfo[0].name);
        setDescShow(projectInfo[0].desc);
        console.log(nameShow)
    },[])


    function clickLeft() {
        setSlideInd(index => {
            
            if(index===0) index = projectInfo.length - 1;
            else index = index - 1;

            setNameShow(projectInfo[index]?.name);
            setDescShow(projectInfo[index]?.desc);
            return index;
        })
       
    }

    function clickRight() {
        setSlideInd(index => {
            if(index=== projectInfo.length - 1) index = 0;
            else index = index + 1;
            setNameShow(projectInfo[index]?.name);
            setDescShow(projectInfo[index]?.desc);

            return index;
        })

    
    }

    function clickDot(idx) {
        setSlideInd(idx);
        setNameShow(projectInfo[idx]?.name);
        setDescShow(projectInfo[idx]?.desc);
        console.log("clickDot -" ,descShow)
    }
  
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
                                    <img key={p.id} className='project-card' src={p.src} alt={p.alt} style={{translate : `${-100 * slideInd}%`}}></img>
                                )
                            })} 
                        </div>
                        <div className='c-button corousal-right' onClick={clickRight}><i className="bi bi-arrow-right"></i></div>
                        <div className='coursal-dots'>
                            {projectInfo.map((_,ind) => {
                                if(ind === slideInd)
                                return(<i className="bi bi-record-circle" key={ind} ></i>)
                                else return (<i className="bi bi-circle" key={ind} onClick={() => clickDot(ind)}></i>)
                            })}
                        </div>
                    </div>

                    <a className='btn btn-primary'>View</a>
                    
                </div>
                
            </div>
    </div>
    
  )
}

export default Project