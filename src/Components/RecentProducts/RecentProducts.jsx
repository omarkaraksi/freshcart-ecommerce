import React, { useContext, useEffect , useState} from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';
import { useQuery } from '@tanstack/react-query';
import {WishlistContext} from '../../context/WishlistContext';


export default function   RecentProducts() {
let {addProductToCart,cart} = useContext(CartContext)
  // async function getProducts() {
  //   let response = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setProducts(response.data.data)
  //   setLoading(false)
  // }
  // let [products, setProducts] = useState();
  // let [loading, setLoading] = useState(true);
  
  let {wishlist,addToWishlist,checkInWishlist,getWishlist} = useContext(WishlistContext)
  


  function getProducts(){
      return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
      
  }
  let {data,isLoading} = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getProducts,
    gcTime:3000,
    select: (data) => data.data.data
  })
  // useEffect(() => {
  //   getProducts()
  // }, [])
  
  useEffect(() => {
    getWishlist()
  },[])
  return <>
    {isLoading ? <Loading/> : 
        <div className='flex flex-wrap justify-center py-8 mx-auto gap-y-4 '>
          {data.map((product, index)=> 
            <div className='w-full md:w-1/3 lg:w-1/5 xl:w-1/6' key={index}>

                <div className='p-2 m-2 rounded-lg shadow-lg product'>
                <Link to={`/products/${product._id}`}  >
                  
                  <img src={product.imageCover}  className='w-full ' alt={product.title} />
                  <h3 className=' text-main'>{product.category.name}</h3>
                  <h4 className=''>{product.title.split(' ').slice(0, 3).join(' ')}</h4>
                  <div className='flex flex-wrap justify-between'>
                    <h5 className=''>{product.price}$</h5>
                    <span ><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
                  </div>
                  </Link>
                  <div className='flex justify-between'>
                  <button className='w-full btn'  onClick={() => addProductToCart(product._id) }>Add to Cart</button>
                  <span onClick={() => addToWishlist(product._id)}><i className={checkInWishlist(product._id) ? "text-red-600 text-3xl cursor-pointer  fa-solid fa-heart ":"text-black text-3xl cursor-pointer  fa-solid fa-heart " }></i></span>
                  </div>
                </div>

            </div>
          )}
        </div>  
      
    
    }
  
  </>
}
