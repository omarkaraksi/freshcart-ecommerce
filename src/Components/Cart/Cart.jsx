import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/CartContext";
import Loading from '../Loading/Loading';
import 'flowbite';
import { Link } from "react-router-dom";

export default function Cart() {
  let {cart,updateProductCountToCart} = useContext(CartContext) ;


  
  return <>
    
    <section className="py-8 antialiased bg-white dark:bg-gray-900 md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              { cart ? cart.products.map( (item ,index)=> 
                  <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img className="w-20 h-20 " src={item.product.imageCover} alt="imac image" />
                    </a>

                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button  type="button" id="decrement-button" onClick={()=>updateProductCountToCart(item.product._id,item.count-1)} data-input-counter-decrement="counter-input" className="inline-flex items-center justify-center w-5 h-5 text-red-600 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 ">
                            -
                        </button>
                        <input type="text" id="counter-input" data-input-counter className="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0 dark:text-white" placeholder value={item.count}  defaultValue={item.count} required />
                        <button type="button" id="increment-button"onClick={()=>updateProductCountToCart(item.product._id,item.count+1)} data-input-counter-increment="counter-input" className="inline-flex items-center justify-center w-5 h-5 text-green-700 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            +
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex-1 w-full min-w-0 space-y-4 md:order-2 md:max-w-md">
                      <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.product.title}</a>
                      <div className="flex items-center gap-4">
                        
                        <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  </div> 
              
              ) : <Loading/>}
              
            </div>
            
          </div>
          {cart ? <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
              <div className="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">${cart.totalCartPrice}</dd>
                    </dl>                   
                  </div>
                  <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${cart.totalCartPrice}</dd>
                  </dl>
                </div>
                <Link to="/checkout" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed to Checkout</Link>
                
              </div> 
          </div> : <Loading /> }

        </div> 
      </div>
    </section>

  </>
}
