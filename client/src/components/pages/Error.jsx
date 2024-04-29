import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/Actions/UserActions'
import { clearChatError } from '../../Redux/Slices/ChatSlicer'
import { clearMessageError } from '../../Redux/Slices/MessageSlicer'

const Error = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentChat = useSelector(state => state.currentChatState)
    const user = useSelector((state) => state.authState);
    const chat = useSelector((state) => state.chatState);
    const message = useSelector(state => state.messageState)

    const handleError = (errorType, clearErrorAction) => {
        toast(errorType, {
            type: "error",
            onOpen: () => dispatch(clearErrorAction())
        })
        dispatch(logout);
    }

    if (chat.error) {
        handleError(chat.error, clearChatError);
        return
    }

    if (message.error) {
        handleError(message.error, clearMessageError);
        return
    }

    return (
        <></>
    )
}

export default Error
