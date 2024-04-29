import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { clearChatError } from '../../Redux/Slices/ChatSlicer'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../../utils/AxiosService'
import { logout } from '../../Redux/Actions/UserActions'

const Error = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentChat = useSelector(state => state.currentChatState)
    const user = useSelector((state) => state.authState);
    const chat = useSelector((state) => state.chatState);
    const message = useSelector(state => state.messageState)

    const handleLogout = async () => {     
            dispatch(logout);     
    }

    if (chat.error) {
        toast.error(chat.error)
        toast(chat.error, {
            type: "error",
            onOpen: () => dispatch(clearChatError())
        })
        handleLogout()
        return
    }

    return (
        <></>
    )
}

export default Error
