import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const Hello = document.createElement("h1")
Hello.innerHTML = "Hello Word"

console.log(Hello)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
