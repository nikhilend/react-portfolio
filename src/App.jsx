import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import {useState } from 'react';

import {EditContext} from './Utils/UserContext'
import { Provider } from "react-redux";
import store from "./Utils/Store";

const App =() => {
  const [viewEditTool, setViewEditTool] = useState(false);
  return (
    <div>
    <Provider store = {store}>
      <EditContext value={[viewEditTool,setViewEditTool]}>
          <Outlet/>
      </EditContext>
    </Provider>

    </div>
  )
}

export default App
