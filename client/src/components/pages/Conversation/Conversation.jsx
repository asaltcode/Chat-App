import React, { useEffect, useState } from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { useSelector } from 'react-redux'
import Profile from "../../../../public/defaultProfile.png"

const Conversation = ({data, currentUserId}) => {   

    const [user, setUser] = useState(null)
    const getUser = async(id) =>{
        const {data} = await AxiosService.get(`${ApiRoutes.GET_USER.path}/${id}`)
        setUser(data.user)
    }
    useEffect(()=>{
        const userId = data.members.find((id)=>id !== currentUserId)
        getUser(userId)
    },[])
  return (<>
    <div className="preview-item px-2">
        <div className="preview-thumbnail">                                       
            <img style={{border: "1.4px solid #2A2D3A"}} className="img-xs object-fit-cover rounded-circle" src={user?.avatar ? user.avatar : Profile} alt=""/>
            <span style={{top: "1px", padding: "3.5px", border:"2px solid #2A2D3A"}} className="bg-success position-absolute rounded-5 end-0"></span>
        </div>
        <div className="preview-item-content d-flex flex-grow">
            <div className="flex-grow">
                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                    <h6 className="preview-subject">{user && user.username}</h6>
                    <p className="text-muted text-small">5 min ago</p>
                </div>
                <p className="text-muted">Sample last massage...</p>
            </div>
        </div>    
    </div> 
    <div className="border-bottom"> {/*This code use is it show bottom line*/}</div>  
    </>
  )
}

export default Conversation