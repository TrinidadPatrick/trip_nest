import { useState } from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='w-full flex flex-col h-full'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default App
