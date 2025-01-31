import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();


export default function WishlistContextProvider({children}){
    const [wishlist, setWishlist,isInWishlist] = useState([]);
    const headers = {'token': localStorage.getItem('userToken')}
    console.log('headers',headers)
    async function addToWishlist(productId) {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
        if(checkInWishlist(productId)){
            removeFromWishlist(productId)
        }else{
            setWishlist(data.data);
            toast.success('Product added to wishlist')

        }
        // setWishlist(data.data);

        
        
    }

    async function removeFromWishlist(productId) {
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        setWishlist(data.data);
        toast.success('Product removed from wishlist')
    }
    async function getWishlist() {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        const productIds = data.data.map(product => product.id);
        setWishlist(productIds);
    }
    function checkInWishlist(productId){
        if(wishlist.includes(productId)){
            return true
        }
        return false
    }
    return <WishlistContext.Provider value={{wishlist, setWishlist, addToWishlist,checkInWishlist,getWishlist,removeFromWishlist}}>
        {children}
    </WishlistContext.Provider>
}