
import axios from 'axios'
import {  useEffect } from 'react'
import { createContext, useState } from 'react'
import toast from 'react-hot-toast'


export let CartContext = createContext()

export default function CartContextProvider({children}){

    let [cart, setCart] = useState(null)

    let headers =  {'token': localStorage.getItem('userToken')}
    async function addProductToCart(productId) {
        try{

            let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers})
            setCart(response.data.data)
            getCart()
            toast.success('Product added to cart')
        }catch(err){
            console.log(err)
        }  
    }  
    
    async function updateProductCountToCart(productId ,count) {
        try{

            let response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers})
            console.log(response.data.data)
            setCart(response.data.data)
            getCart()
            toast.success('Cart updated successfully')
        }catch(err){
            console.log(err)
        }  
    }  

    async function removeFromCart(productId) {
        try{

            let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
            console.log(response.data.data)
            setCart(response.data.data)
            getCart()
            toast.success('Product removed from cart')
        }catch(err){
            console.log(err)
        }  
    }

    function getCart() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        
        .then(res => {
            console.log(res.data.data)
            setCart(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCart()   
    },[])

    return  <CartContext.Provider value={{cart, setCart,addProductToCart,getCart,updateProductCountToCart,removeFromCart}}>
                {children}
    </CartContext.Provider>

}