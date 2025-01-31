import { useContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Loading from '../Loading/Loading';
import dateFormat, { masks } from "dateformat";

export default function Allorders() {
  let userToken = localStorage.getItem('userToken');
  let {id}= jwtDecode(userToken) 
  let [orders, setOrders] = useState([]);
  let [loading ,setLoading] = useState(false);
   
  async function getUserOrders() {
    setLoading(true)
    try{
      let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`) ;
      setOrders(data)
      console.log(data)
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err)
    }

   }
   useEffect(() => {
    getUserOrders()
   },[]) 
  return <>
    <h2>Your Orders</h2>
    <div className="overflow-x-auto">
  <table className="w-full border-collapse table-auto">
    <thead>
      <tr className="text-sm tracking-wider text-left text-gray-600 uppercase bg-gray-200">
        <th className="px-4 py-3">Order ID</th>
        <th className="px-4 py-3">Date</th>
        <th className="px-4 py-3">Total</th>
      </tr>
    </thead>
    <tbody>
      {/* Example Row 1 */}

      {orders ? orders.map((order,index) => (
      <tr key={index} className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 text-sm text-gray-700">ORD-{order.id}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{dateFormat(order.createdAt, "dd / mm / yyyy, h:MM:ss TT")}
        </td>
        <td className="px-4 py-3 text-sm text-gray-700">${order.totalOrderPrice}</td>
        
      </tr>
      )): <Loading/>}
      
      
    </tbody>
  </table>
</div>

    
  </>
}
