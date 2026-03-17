import React from 'react'
import HeaderLayout from './HeaderLayout'
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