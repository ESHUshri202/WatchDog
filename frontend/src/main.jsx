import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import CreateEmployee from './components/CreateEmployee.jsx'
import ListEmployee from './components/ListEmployee.jsx'
// import 'remixicon/fonts/remixicon.css'
// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <Layout/>,
//     children: [
//       {
//         element: <Home/>,
//         path: "home",
//       },
//       {
//         element: <CreateEmployee/>,
//         path: "create-employee",
//       },
//       {
//         element:<ListEmployee/>,
//         path: "list-employee",
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App/>
  </StrictMode>,
)
