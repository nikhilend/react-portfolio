import {lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider}  from "react-router-dom"
import MainContent from "./components/MainContent.jsx"
import ContactSent from './components/ContactSent.jsx'

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
      path: "/project/:id",
      element: <Suspense><ProjectDetails/></Suspense>
    },
    {
      path: "/contact",
      element: <ContactSent/>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={reactRoute} />
)
