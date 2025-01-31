import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { useSelector } from 'react-redux'
export default function Navbar() {
  
  let count = useSelector((state) => state.counter.count)
  let {userToken ,logout} = useContext(UserContext)
  let {cart} = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate();
  
const handleLogout = () => {
  logout(); // Clear user state
  navigate('/login'); // Redirect to login page
};
  return <>

    <header className="fixed inset-x-0 top-0 z-50 bg-gray-200">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">

        <Link to={'/'} className="lg:pe-4">
          <span className="sr-only">Your Company</span>
          <img className="" src={logo} width={120} alt />
        </Link>
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden capitalize lg:flex lg:gap-x-2">
          {userToken ?  
            <>
              <NavLink to={'/'} className="font-medium text-gray-900 ">home</NavLink>
              <NavLink to={'brands'} className="font-medium text-gray-900 ">brands</NavLink>
              <NavLink to={'categories'} className="font-medium text-gray-900 ">categories</NavLink>
              <NavLink to={'products'} className="font-medium text-gray-900 ">products</NavLink>
              <NavLink to={'wishlist'} className="font-medium text-gray-900 ">Wishlist</NavLink>

            </>
          
          
          : null}
          
        </div>
        <div className="hidden space-x-3 lg:flex lg:flex-1 lg:justify-end">
          <ul className='flex space-x-2'>
            <li><i className='fab fa-facebook-f fa-sm '></i></li>
            <li><i className='fab fa-x-twitter fa-sm '></i></li>
            <li><i className='fab fa-instagram fa-sm '></i></li>
            <li><i className='fab fa-telegram-plane fa-sm '></i></li>
          </ul>
          {!userToken ? 
          <>
            <NavLink to={'/register'} className="font-medium text-gray-900 ">Register</NavLink>
            <NavLink to={'login'} className="font-medium text-gray-900 ">Login <span aria-hidden="true">→</span></NavLink>
          
          </> : 
          <>
                      <NavLink to={'cart'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"><i className="fa fa-shopping-cart" aria-hidden="true"></i> {cart ? cart.products.length : 0}</NavLink>
                      <span onClick={() => handleLogout(null)} className="font-medium text-green-600 cursor-pointer">Log Out</span>

          </>
          
          } 
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={'home'} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="" src={logo} width={120} alt />
            </NavLink>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
              {userToken ?  
                <>
                <NavLink to={'/'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">home</NavLink>
                <NavLink to={'brands'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">brands</NavLink>
                <NavLink to={'categories'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">categories</NavLink>
                <NavLink to={'products'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">products</NavLink>
                </>
              
              
              : null}
              </div>
              {!userToken ? 
                <div className="py-6">
                  <NavLink to={'/register'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">Register</NavLink>
                  <NavLink to={'login'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">Log in <span aria-hidden="true">→</span></NavLink>
                </div>
:
                  <>
                      <NavLink to={'cart'} className="block font-medium text-gray-900 rounded-lg text-base/7 hover:bg-gray-50"><i className="fa fa-shopping-cart" aria-hidden="true"></i> {cart ? cart.products.length : 0}</NavLink>
                      <span onClick={() => handleLogout(null)}className="block font-medium text-green-600 rounded-lg cursor-pointer text-base/7 hover:bg-gray-50">Log Out</span>              

                  </>
                  

}                       
              
              </div>
          </div>
        </div>
      </div>
    </header>

  </>
}
