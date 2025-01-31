import { useEffect } from 'react'
import {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
export let  UserContext = createContext()



export default function UserContextProvider({children}) {
 
    const [userToken, setUserToken] = useState(null)
    useEffect(() => {
        
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.getItem('userToken'))
        }else{
            setUserToken(null)
            // navigate('/login')
        }
    }, [userToken])

    const [count, setCount] = useState(0)
    function increment() {
        setCount(Math.random())
    }
    function logout() {
        localStorage.removeItem('userToken')
        setUserToken(null)
        // navigate('/login')
    }
    return <UserContext.Provider value={{count ,increment,userToken,setUserToken,logout}}>
        {children}
    </UserContext.Provider>
}        

