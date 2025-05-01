import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./Pages/Home"

function App() {
  

  return (
   <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/*" element= {<Home/>}/>
        </Routes>
      </Router>
      <Footer/>
   </>
  )
}

export default App
