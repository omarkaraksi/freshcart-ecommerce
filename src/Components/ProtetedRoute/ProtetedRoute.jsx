import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
export default function ProtetedRoute({children}) {
  // let {userToken} = useContext(UserContext)
  let userToken = localStorage.getItem('userToken')
  if(userToken){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
  // console.log(userToken)
  
}
