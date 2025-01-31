import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function Layout() {

	return <>

		<Navbar />

		<div className="container py-12 mx-auto mt-4">
			<Toaster />
			<Outlet></Outlet>
		</div>

		<Footer />

	</>
}
