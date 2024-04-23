import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Conversation from '../Conversation/Conversation'
import { getChat } from '../../../Redux/Actions/ChatActions'
import { useNavigate } from 'react-router-dom'
import { currentChater } from '../../../Redux/Slices/CurrentChatSlicer'

const Friends = ({md, sm, s,}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.authState);
    const {chat} = useSelector(state => state.chatState);
    const {currentChat} = useSelector(state => state.currentChatState)
    // const [currentChat, setCurrentChat] = useState(null);

    const handleCurrentChat = async (chat) =>{
        console.log(chat)
        if(s === "block"){
            await dispatch(currentChater(chat))
            navigate("/chat")
            return
        }
        dispatch(currentChater(chat))
    }
    useEffect(()=>{        
    if(user){
        dispatch(getChat(user._id))     
    }         
    },[user, currentChat])
    
  return (<>
        <div style={{background: "#191C24", zIndex: "100"}} className=" overflow-hidden border-bottom col-12 col-md-4 col-sm-12 d-md-block text-center p-1 ms-2 position-absolute top-0 start-0">
            <h3 className="text-light fw-bold">Chates 🤩</h3>                                                
        </div>  
    <div className={`col h-100 overflow-scroll col-md-4  p-0 border-end border-secondary d-sm-${sm} d-${s} d-md-${md} `}>
        <div className="col p-0">
            <div className="preview-list mt-5 px-3 px-md-1 px-sm-2 text-light">
                {chat && chat.map((chat, i) => {
                    return( <div key={i} onClick={()=> handleCurrentChat(chat)}>
                    <Conversation  data={chat} currentUserId={user && user._id} />
                    </div>  
                    )                    
                })}                                            
            </div>
        </div>
    </div>
    </>
  )
}

export default Friends