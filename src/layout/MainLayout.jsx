import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-[7vh]">
        <Outlet />
      </main>
    </div>
  )
}
