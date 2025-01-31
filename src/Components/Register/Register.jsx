
import * as yup   from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' ;
export default function Register() {
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState(false)
  let navigate = useNavigate();

  function register(values) {
    console.log(values)
     if(formik.isSubmitting){
        setLoading(true)
     }
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then(res => {
        setLoading(false)
        setError(false)
        localStorage.setItem('userToken', res.data.token)
        navigate('/')

        
     }).finally(() => { 
        setLoading(false)
        setError(false)

     }).catch(err => {
        setLoading(false)
        setError(err.response.data.message)
     })
  }
  let validationSchema = yup.object().shape({
    name: yup.string().required('name is required').min(3,'name must be at least 3 characters').max(20,'name must be at most 20 characters'),
    email: yup.string().email('email is not valid').required('email is required') ,
    password: yup.string().required('password is required').min(6,'password must be at least 6 characters').max(20,'password must be at most 20 characters').matches(/[A-Za-z0-9]$/, 'password must contain at least one letter and one number'),
    rePassword: yup.string().required('repassword is required').oneOf([yup.ref('password')], 'passwords must match'),
    phone: yup.string().required('phone is requered').matches(/^01[0125][0-9]{8}$/,'we need egyptian mobile number')
  })
  const formik = useFormik({
    initialValues: {
      name  : '',
      email: '',
      password: '',
      rePassword: '',
      phone :''
    },
    validationSchema ,
    onSubmit: register
  })
  return <>
    <h2>Register</h2>
    <form className="mx-auto lg:w-1/2" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mx-auto mb-5">
          {error ? <span className='text-red-600'>{error}</span> : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      </div>
       {formik.touched.name && formik.errors.name ? <span className='text-red-600'>{formik.errors.name}</span> : null}
  
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="email" value={formik.values.email} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      </div>
      {formik.touched.email && formik.errors.email ? <span className='text-red-600'>{formik.errors.email}</span> : null}
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      {formik.touched.password && formik.errors.password ? <span className='text-red-600'>{formik.errors.password}</span> : null}
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  name="rePassword" id="repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      </div>
      {formik.touched.repeat_password && formik.errors.repeat_password ? <span className='text-red-600'>{formik.errors.repeat_password}</span> : null}
      <div className="relative z-0 w-full mb-5 group">
        <input type="phone" onChange={formik.handleChange} onBlur={formik.handleBlur}  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
        <label htmlFor="phone" value={formik.values.phone} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      </div>
      {formik.touched.phone && formik.errors.phone ? <span className='text-red-600'>{formik.errors.phone}</span> : null}
      <div className="relative z-0 w-full mb-5 group">
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>
      {loading ? <span className='text-blue-600'>loading...</span> : null}
    </form>





  </>
}
