import React from 'react'
import Home from '../components/pages/Client/Home'
import Login from '../components/pages/Auth/Login'
import Register from '../components/pages/Auth/Register'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Chat from '../components/pages/Client/Chat'
import Friends from '../components/pages/Client/Friends'
import HomeContent from '../components/pages/Client/Home/HomeContent'
import EditProfile from '../components/pages/Client/EditProfile/EditProfile'

const AppRouters = [
    // Auth Routers
    {
        path: "/login",
        exact: true,
        element: <><Login/></>
    },
    {
        path: "/register",
        exact: true,
        element: <><Register/></>
    },
    {
        path: "/",
        exact: true,
        element:
        <>           
          <Home/>
        </>,
       children: [
        {
          path: "",
          element: <HomeContent/> 
        },
        {
          path: "chat",
          element: <>
            <ProtectedRoute>
              <Chat/>
            </ProtectedRoute>          
          </> 
        },
        {
          path: "friends",
          element:<>
           <ProtectedRoute>
              <div style={{height: "h-100"}} className="row overflow-hidden position-relative">
                <Friends  md={"none"} s={"block"} />
              </div>
           </ProtectedRoute>
          </>
        },
        {
          path: "edit",
          element: <ProtectedRoute><EditProfile/></ProtectedRoute> 
        },
      ]
    },
    {
        path: "/*",
        exact: true,
        element: <><Navigate to={"/"}/></>
    },
]

export default AppRouters