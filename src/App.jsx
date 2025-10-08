import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"
import {createBrowserRouter , RouterProvider, Outlet}  from "react-router-dom"

const App =() => {
  return (
    <div>
      <Header />
      <MainContent/>
      {/* <Footer/> */}
    </div>
  )
}

const reactRoute = createBrowserRouter([
  
{
  path: "/",
  element: <App/>
}
])

export default App
