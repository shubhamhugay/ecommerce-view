import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'

function App() {
  
  return (
  <>
  <Navbar/>
  <main>
      <Outlet/>
  </main>

  </>
  )
}

export default App
