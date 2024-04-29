import React, { useEffect, useRef, useState } from 'react'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { format } from "timeago.js"
import { getMessages, receiveMessage } from '../../../Redux/Actions/MessageActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Profile from "../../../../public/defaultProfile.png"

const Messages = ({ recieveMessage }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { message } = useSelector(state => state.messageState)
    const { user } = useSelector((state) => state.authState);
    const { currentChat } = useSelector(state => state.currentChatState)
    const [receiveUser, setReceiveUser] = useState(null);
    const scroll = useRef()
    const lastScrollPosition = useRef(0);

    const getUser = async (id) => {
        const { data } = await AxiosService.get(`${ApiRoutes.GET_USER.path}/${id}`)
        setReceiveUser(data.user)
    }

    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === currentChat._id) {
            dispatch(receiveMessage(recieveMessage))
        }
    }, [recieveMessage])

    useEffect(() => {
        const userId = currentChat.members.find((id) => id !== user?._id)
        if (currentChat !== null) getUser(userId);
    }, [currentChat, user?._id])

    useEffect(() => {
        if (currentChat !== null) {
            dispatch(getMessages(currentChat._id))
        }
    }, [currentChat])

    //Always scroll to last message
    useEffect(() => {
        const scrollToBottom = () => {
            scroll.current.scrollTop = scroll.current.scrollHeight - lastScrollPosition.current;
        };

        scrollToBottom();
    }, [message])

    const handleScroll = () => {
        lastScrollPosition.current = scroll.current.scrollHeight - scroll.current.scrollTop;
    };

    return (
        <>
            <div style={{ background: "#191C24", zIndex: "100" }} className="overflow-hidden border-bottom col-12 col-md-8 col-sm-12 d-md-block text-center p-1 ms-2 position-absolute top-0 end-0">
                <div className="row">
                    <div className="pe-5 col-sm-6 ps-md-5 col-8 text-start">
                        <h3 className="text-light fw-normal"><span className='pointer text-light me-4 d-md-none' onClick={() => navigate("/friends")} ><i className='mdi mdi-arrow-left'></i></span>{receiveUser?.username}</h3>
                    </div>
                    <div className="px-5 col-sm-6 col-4 text-end">
                        <img style={{ border: "1.4px solid #fff" }} className="img-xs object-fit-cover rounded-circle" src={receiveUser?.avatar ? receiveUser.avatar : Profile} alt="" />
                    </div>
                </div>
            </div>
            <div className="col col-md-8 p-0 overflow-scroll h-100" ref={scroll} onScroll={handleScroll}>
                <div className="p-0 m-0 h-100">
                    <div style={{ paddingBottom: "80px" }} className="px-4 pt-5">
                        {message && message.map((userMes, i) => {
                            const Me = userMes?.senderId === user?._id
                            return <div key={i} className={`row mt-2 ${Me ? "justify-content-end" : ""} `}>
                                <div className={`col-11 col-sm-7 col-md-8 mx-2 text-light p-0 ${Me && 'text-end'}`}>
                                    <div className={`d-inline-block px-3 ${Me ? "S" : "R"}-chatMessage`}>
                                        <p className="mb-0 pe-5 text-start">{userMes.text}</p>
                                        <div className={`${Me ? "text-end" : ""}`}>
                                            <span className="fw-lighter">{format(userMes.createdAt)}</span>
                                            {Me ? <i className="mdi mdi-check-all"></i> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages
