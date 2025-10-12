import {StrictMode , lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider}  from "react-router-dom"
import MainContent from "./components/MainContent.jsx"

const ProjectDetails = lazy(() => import('./components/ProjectDetails.jsx'))

const reactRoute = createBrowserRouter([
  
{
  path: "/",
  element: <App/>,
  children:[
    {
      path: "/",
      element: <MainContent/>
    },
    {
      path: "/project",
      element: <Suspense><ProjectDetails/></Suspense>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={reactRoute} />
  </StrictMode>
)
