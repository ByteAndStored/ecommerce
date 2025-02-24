import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import img from '../assets/images/light-patten.svg'

export default function Layout() {
  return (
    <div style={{backgroundImage:`url(${img})`}} className='flex flex-col justify-between min-h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
    )
}
