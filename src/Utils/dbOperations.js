export async function getProjects(projectRedux) {
    if(projectInfo.length > 0) 
    {
        return projectInfo
    } 
    else 
    {
        data = await fetch(MONGO_FETCH_ROUTE +"/projects").then(data => data.json());
        dispatch(addProjects(data["projects"]))
    }
}