import React from 'react'
import HeaderLayout from './HeaderLayOut'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <HeaderLayout/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout