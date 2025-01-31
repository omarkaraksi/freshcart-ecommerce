import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';

export default function ProductDetails() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  let [product, setProduct] = useState();
  let [loading, setLoading] = useState(true);
  let {id} = useParams() ;
  let {addProductToCart} = useContext(CartContext);

  
  async function getProductDetails() {
    console.log(id)
    setLoading(true)
    try{
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      console.log(data.data)
      setProduct(data.data)
      setLoading(false)
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

    useEffect(() => {
      getProductDetails()
    }, []) ;
  
    // write your code
  return <>
    {loading ? <Loading/> : 
    <>
        <h2>ProductDetails</h2>
        <div className='flex flex-wrap items-center w-full'>
          <div className='w-1/4 '>
                <Slider {...settings}>
                    {product.images.map((image, index) => (
                      
                    <div key={index}>
                      <img src={image}  className='w-full ' alt={product.title} />
                    </div>
                    ))}
                    
                </Slider>         
           </div>
          <div className='w-3/4 ps-4'>
            <h2 className='m-2'>{product.title}</h2>
            <p className='m-2'>{product.category.name}</p>
            
            <p className='m-2 text-gray-600'>{product.description}</p>
              
            <div className='flex flex-wrap justify-between ps-3'>
                <h5 className=''>{product.price}$</h5>
                <span ><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
                <button className='w-full btn' onClick={() => addProductToCart(product._id)}>Add to Cart</button>

            </div>
            
          </div>
          
          
        </div>
   </>
    }
    
  </>
}
