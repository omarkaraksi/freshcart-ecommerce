import  { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading';

export default function Brands() {
  let [brands, setBrands] = useState([])
  
  let [loading, setLoading] = useState(true)
  async function getBrands() {
    try {
      setLoading(true)
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(res.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
      getBrands()
  },[])
  return  <>
    <div>
  <h2>Brands</h2>
  <section className="py-8 antialiased bg-gray-50 dark:bg-gray-900 md:py-16">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading?<Loading></Loading>:
        brands.map((brand) => (
        <a key={brand._id}  className="flex flex-col items-center px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="w-full h-50" src={brand.image} alt={brand.name}/>
          <span className="text-2xl font-medium text-gray-900 dark:text-white bold">{brand.name}</span>
        </a>
      ))}
        
      </div>
    </div>
  </section>
</div>
  </>
}
