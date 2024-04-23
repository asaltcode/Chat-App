import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppRouters from './utils/AppRouters'
import { useDispatch } from 'react-redux'
import { loadUser } from './Redux/Actions/UserActions'

const App = () => {
  const router = createBrowserRouter(AppRouters)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUser)
  },[])
  return (
    <div className="mainContainer">
      <RouterProvider router={router} />
    </div>
  )
}
export default App