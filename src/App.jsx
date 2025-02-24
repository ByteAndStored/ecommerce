import React, { lazy, Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Categories from './components/Categories';
const Brand = lazy(() => import('./components/Brand'));
import Notfound from './components/Notfound';
import '../node_modules/flowbite/dist/flowbite.min.js'
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';
import Loading from './components/Loading';
import WishList from './components/WishList';
import ForgotPass from './components/ForgotPass';
import VerifyResetPassCode from './components/VerifyResetPassCode';
import ResetPass from './components/ResetPass';






export default function App() {


  let routes = createBrowserRouter([
    {
    path:'/',element:<Layout></Layout>,children:[
      {index:true,element:<Home></Home>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/forgot-password',element:<ForgotPass></ForgotPass>},
      {path:'/verify-code',element:<VerifyResetPassCode></VerifyResetPassCode>},
      {path:'/reset-password',element:<ResetPass></ResetPass>},
      {path:'/products',element:<Products></Products>},
      {path:'/productdetails/:id/:catId',element:<ProductDetails></ProductDetails>},
      {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/categories',element:<Categories></Categories>},
      {path:'/wishList',element:<WishList></WishList>},
      {path:'/allorders',element:<Orders></Orders>},
      {path:'/brands',element:<Suspense fallback={<Loading></Loading>}><Brand></Brand></Suspense>},
      {path:'*',element:<Notfound></Notfound>},
    ]
  }
])

  return (
    <RouterProvider router={routes}>App</RouterProvider>
    
  )
}
