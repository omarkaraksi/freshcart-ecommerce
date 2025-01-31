import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { use } from 'react';
import Loading from '../Loading/Loading';

export default function Categories() {
  let [categories, setCategories] = useState([])
  let [subCategories, setSubCategories] = useState([])
  
  let [loading, setLoading] = useState(true)
  let [subLoading, setSubLoading] = useState(true)

  async function getCategories() {
    try {
      setLoading(true)
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(res.data.data)
      setCategories(res.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  async function handleCategoryClick(categoryId) {
      try{
        setSubLoading(true)
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
        console.log(data.data)
        setSubCategories(data.data)
        setSubLoading(false)
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth" // Smooth scrolling effect
        });

      }catch(err){
        console.log(err)
      }
    }
  useEffect(() => {
      getCategories()
  },[])
  return  <>
    <div>
    <h2 className="py-8 text-2xl font-semibold text-center text-gray-900 dark:text-white sm:text-2xl">Categories</h2>
    <section className="py-8 antialiased bg-gray-50 dark:bg-gray-900 md:py-16">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading?<Loading></Loading>:
        categories.map((category) => (
        <a key={category._id} onClick={()=>handleCategoryClick(category._id)} className="flex flex-col items-center px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="w-full h-80" src={category.image} alt={category.name}/>
          <span className="text-2xl font-medium text-gray-900 dark:text-white bold">{category.name}</span>
        </a>
      ))}
      
      </div>
    </div>
    
  </section>
  
  {subCategories?.length>0 ?  
  <>   
  <h2 className="py-8 text-xl font-semibold text-center text-gray-900 dark:text-white sm:text-2xl">Sub Categories</h2>
  <section className="py-8 antialiased bg-gray-50 dark:bg-gray-900 md:py-16">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      
      <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {subLoading?<Loading></Loading>:
        subCategories.map((subcategory) => (
        <a key={subcategory._id}  className="flex flex-col items-center px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
          <span className="text-2xl font-medium text-gray-900 dark:text-white bold">{subcategory.name}</span>
        </a>
      ))}
      
      </div>
    </div>
    
  </section>
  </>
:null}
</div>
  </>
}
