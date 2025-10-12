import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {  } from 'react-router-dom'
import {createBrowserRouter, RouterProvider}  from "react-router-dom"
import MainContent from "./components/MainContent.jsx"

const reactRoute = createBrowserRouter([
  
{
  path: "/",
  element: <App/>,
  children:[
    {
      path: "/",
      element: <MainContent/>
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={reactRoute} />
  </StrictMode>
)
