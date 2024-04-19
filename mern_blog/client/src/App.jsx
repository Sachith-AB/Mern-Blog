import {BrowserRouter , Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/signup'
import Dashboard from './pages/Dashboard'
import Project from './pages/project'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/ about" element={<About/>}/>
      <Route path="/ sign-in" element={<Signin/>}/>
      <Route path="/ sign-up" element={<Signup/>}/>
      <Route path="/ dashboard" element={<Dashboard/>}/>
      <Route path="/ Project" element={<Project/>}/>
      
            

    </Routes>
    </BrowserRouter>
  )
}
