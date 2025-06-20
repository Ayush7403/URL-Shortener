import React from 'react'
import Home from './pages/Home'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
// import './index.css'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
