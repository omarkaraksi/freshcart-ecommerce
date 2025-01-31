import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { WishlistContext } from '../../context/WishlistContext';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {

  let  {addProductToCart} = useContext(CartContext);
  let  {removeFromWishlist} = useContext(WishlistContext); //WishlistContext 
  function getWishlist(){
    let headers =  {'token': localStorage.getItem('userToken')}
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
  }

let {data,isLoading} = useQuery({
  queryKey: ['wishlist'],
  queryFn: getWishlist,
  select: (data) => data.data.data
})
  return <>
    <h2>Wishlist</h2>
    {isLoading && <p>Loading...</p>}
    {data && data.map(product =>  

      <div key={product._id} className="flex flex-wrap w-full my-2 shadow-xl bg-base-100">
          <div className='flex flex-col w-1/4'>
              <img src={product.imageCover} className='w-full p-4' alt="" />
              <h2 className='p-4'>{product.title.split(' ').slice(0,3).join(' ')}</h2>

          </div> 
          <div className='flex flex-col w-2/4 align-middle '>
          
          </div> 
          <div className='flex flex-row justify-center w-1/4 p-4'>
              <div className='flex flex-col align-center '>
                <p className='font-bold'>${product.price}</p>
                <button  className='bg-red-500 hover:bg-red-600' 
                onClick={() => removeFromWishlist(product.id)}>
                Remove from wishlist
              </button>
              <button className='bg-green-500 hover:bg-green-600' onClick={() => addProductToCart(product)} >add to cart</button>

              </div>

          </div> 
          


      </div>


    )}
  </>
}
