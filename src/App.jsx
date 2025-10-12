import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import {useState } from 'react';

import {EditContext} from './Utils/UserContext'

const App =() => {
  const [viewEditTool, setViewEditTool] = useState(false);
  return (
    <div>
    <EditContext value={[viewEditTool,setViewEditTool]}>
        <Outlet/>
    </EditContext>

    </div>
  )
}

export default App
