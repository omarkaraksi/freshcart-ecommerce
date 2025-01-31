
import * as yup   from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' ;
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
export default function Register() {
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState(false)
  let navigate = useNavigate();

  let {setUserToken} = useContext(UserContext)
  
  function login(values) {
    console.log(values)
     if(formik.isSubmitting){
        setLoading(true)
     }
     axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(res => {
        setLoading(false)
        setError(false)
        localStorage.setItem('userToken', res.data.token)
        setUserToken(res.data.token)
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
    email: yup.string().email('email is not valid').required('email is required') ,
    password: yup.string().required('password is required'),
    
  })
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema ,
    onSubmit: login
  })
  return <>
    <h2>Login</h2>
    <form className="mx-auto lg:w-1/2" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mx-auto mb-5">
          {error ? <span className='text-red-600'>{error}</span> : null}
      </div>
      
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
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        {loading ? <span className='text-blue-600'>loading...</span> : null}

      </div>
    </form>





  </>
}
