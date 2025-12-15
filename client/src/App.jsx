import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import AddNewTask from "./pages/AddNewTask/AddNewTask"
import AllTasks from "./pages/AllTasks/AllTasks"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import HomePage from './pages/HomePage/HomePage'
import Card from './components/Card/Card'
import Filters from './components/Filters/Filters'
import TaskDetail from './pages/TaskDetail/TaskDetail'
import TaskUpdate from './pages/TaskUpdate/TaskUpdate'

import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/tasks/' element={<AllTasks />}/>
          <Route path='/tasks/:id' element={<TaskDetail />}/>
          <Route path='/tasks/:id/update' element={<TaskUpdate />}/>
          <Route path='/addNewTask' element={<AddNewTask />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
