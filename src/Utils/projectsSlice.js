import { createSlice } from "@reduxjs/toolkit"

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: []
  },
  reducers: {
    addProjects: (state, action) => {
      state.projects = action.payload
    },
    setProjectData: (state, action) => {
      debugger
        const {updateID, current} = action.payload
        const index = state.projects.findIndex(p => p.id === updateID);
        if (index !== -1) 
        {
            state.projects[index] = {
            ...state.projects[index],
            ...current
        }
        }
    },
    addNewProject: (state, action) => {
      state.projects = [...state.projects, action.payload]
    },

    removeProject: (state, action) => {
      state.projects = state.projects.filter((prj)=> {prj.id != action.payload})
    }
  }
})

export const { addProjects,setProjectData, addNewProject, removeProject } = projectsSlice.actions;
export default projectsSlice.reducer;