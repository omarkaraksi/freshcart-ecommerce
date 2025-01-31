import React, { useContext } from 'react'
import style from './Home.module.css'
import { UserContext } from '../../context/UserContext'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Home() {
  return <>
    <h2>Home</h2>
    <RecentProducts/>
  </>
}
