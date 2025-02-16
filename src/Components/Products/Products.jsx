import React from 'react'
import style from './Products.module.css'
import {increment ,decrement,incrementByAmount} from '../../Slices/CounterSlice'
import RecentProducts from '../RecentProducts/RecentProducts'
import { useSelector ,useDispatch } from 'react-redux'
export default function Products() {
 let count=  useSelector((state) => state.counter.count)
 let dispatch = useDispatch()
  console.log(count)
  return <>
    <h2>Products</h2>
    <RecentProducts/>

    {count}

    <button onClick={() =>  dispatch(increment()) }>Increment</button>
    <button onClick={() =>  dispatch(decrement()) }>Decrement</button>
    <button onClick={() =>  dispatch(incrementByAmount(5)) }>Increment By Amount</button>

  </>
}
