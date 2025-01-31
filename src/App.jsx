
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ProtetedRoute from './Components/ProtetedRoute/ProtetedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './context/CartContext.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allorders from './Components/Allorders/Allorders';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import  { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishlistContextProvider from './context/WishlistContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'

let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {path:'register' , element: <Register/>},
    {path:'login' , element: <Login/>},
    {index:true , element: <ProtetedRoute><Home/></ProtetedRoute> },
    {path:'cart' , element: <ProtetedRoute><Cart/></ProtetedRoute> },
    {path:'checkout' , element: <ProtetedRoute><Checkout/></ProtetedRoute> },
    {path:'allorders' , element: <ProtetedRoute><Allorders/></ProtetedRoute> },
    {path:'wishlist' , element: <ProtetedRoute><Wishlist/></ProtetedRoute> },
    {path:'categories' , element: <ProtetedRoute><Categories/></ProtetedRoute> },
    {path:'brands' , element: <ProtetedRoute><Brands/></ProtetedRoute> },
    

    {path:'brands' , element: <ProtetedRoute> <Brands/></ProtetedRoute>},
    {path:'categories' , element: <ProtetedRoute><Categories/></ProtetedRoute>},
    {path:'products' , element: <ProtetedRoute><Products/></ProtetedRoute>},
  
    {path:'products/:id' , element: <ProtetedRoute><ProductDetails/></ProtetedRoute>},
    
    {path:'*' , element: <NotFound/>},
  ]
}])

const query = new QueryClient()
function App() {

  return <>
  <QueryClientProvider client={query}>
    <WishlistContextProvider>
    <CartContextProvider>
      <UserContextProvider>
        <ReactQueryDevtools/>
          <RouterProvider router={routers}></RouterProvider>
      </UserContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
  </QueryClientProvider>
  </>
}

export default App
