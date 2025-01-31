import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import * as Yup   from 'yup'
import { useFormik } from 'formik'
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  let  {cart} = useContext(CartContext);
  let {userToken} = useContext(UserContext) ;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  function handleCheckout(values) {
    if(formik.isSubmitting){
      setLoading(true)
    }
    let headers =  {'token': userToken}
   axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=http://localhost:5173`,values,{headers}).then(data => {
      setLoading(false)
      setError(false)
      console.log(data)
      toast.success('Success')
      console.log(data.data.session.url)
      location.href = data.data.session.url
      
      // navigate('/')

      
   }).finally(() => { 
      setLoading(false)
      setError(false)

   }).catch(err => {
      setLoading(false)
      setError(err)
   })
  }
  const formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone:'',
    },
    validationSchema: Yup.object({
      city: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      details: Yup.string().required('Required'),
      
    }),
    onSubmit: handleCheckout
  });
  return <>
    <h2>Checkout</h2>
    <form className="mx-auto lg:w-1/2" onSubmit={formik.handleSubmit}>
      
      
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""  />
        <label htmlFor="details" value={formik.values.details} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
      </div>
      {formik.touched.details && formik.errors.details ? <span className='text-red-600'>{formik.errors.details}</span> : null}
      <div className="relative z-0 w-full mb-5 group">
        <input type="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>
      {formik.touched.phone && formik.errors.phone ? <span className='text-red-600'>{formik.errors.phone}</span> : null}

          
      <div className="relative z-0 w-full mb-5 group">
        <input type="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}  name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
      </div>
      {formik.touched.city && formik.errors.city ? <span className='text-red-600'>{formik.errors.city}</span> : null}
                
        <div className="relative z-0 w-full mb-5 group">
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        {loading ? <span className='text-blue-600'>loading...</span> : null}

       </div>
    </form>
  </>
}
