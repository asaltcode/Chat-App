import React, { useEffect, useRef, useState } from 'react'
import Friends from './Friends'
import Messages from './Messages'
import { useDispatch, useSelector } from "react-redux"
import { getChat } from '../../../Redux/Actions/ChatActions'
import InputEmoji from "react-input-emoji"
import socket from '../../../utils/SocketService'
import { addMessage, receiveMessage } from '../../../Redux/Actions/MessageActions'
import ChatAnimation from '../../../animation/ChatAnimation'


const Chat = () => {
    const dispatch = useDispatch();
    const {lastMessage} = useSelector(state => state.messageState)
    const {currentChat} = useSelector(state => state.currentChatState)
    const { user } = useSelector((state) => state.authState);
    const { chat } = useSelector((state) => state.chatState);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [recieveMessage, setRecieveMessage] = useState(null )


    
   // Connect to Socket.io
    useEffect(() => {    
      socket.emit('new-user-add', user?._id);
      socket.on('get-users', (users) => {
        setOnlineUsers(users);
      });
    }, [user]);

        //send message to socket server
        useEffect(()=>{
            const receiverId = currentChat?.members.find((id)=> id !== user._id);
            let data = {lastMessage, receiverId}
            if(lastMessage && lastMessage !== null){
                socket.emit("send-message", data)
                console.log("send message to socket server", receiverId)
            }    
        },[lastMessage])

      // Get the message from socket server
    useEffect(() => {
        socket.on("receive-message", data => {
            setRecieveMessage(data.lastMessage)
        });
    }, []); 


    const handleSend = async (e) => {
        e.preventDefault();
        const newChat = {
            senderId: user && user._id,
            text: newMessage,
            chatId: currentChat._id
        }
       
         dispatch(addMessage(newChat))
         setNewMessage('')

    };
  
    const handleChange = (newMessage) => {
      setNewMessage(newMessage);
    };
  
    useEffect(() => {
      if (user) {
        dispatch(getChat());
      }
    }, [user]);
  return (
    <div className="row position-absolute start-0 bottom-0 top-0 overflow-hidden end-0 h-100 w-100 m-0">
        <div  className="col-12 card position-relative overflow-hidden h-100">
            <div  className="row overflow-hidden position-relative">
                {/* Show all Friends */}                
                {user && <Friends md={"block"} sm={"none"} s={"none"} data={chat && chat} />}
                {/* Chate container */}
                {currentChat === null ? <div className="col col-md-8 p-0 overflow-scroll text-light h-100"><ChatAnimation/></div> : <Messages recieveMessage={recieveMessage} />}
                 
            </div>
        {/* message input content start */}
            {
                currentChat !== null ? <>
                <div className="col-md-8 bg-warnign position-absolute bottom-0 end-0 p-0 ">
                {/* <form className="form-sample"> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group row justify-content-center">
                                <div className="col-11 col-sm-11 col-md-11">
                                    <div style={{zIndex: "10", position: "relative"}} className="d-flex gap-2">
                                        <div className="">
                                            <button type="button" style={{cursor: "pointer", border: "none"}} className="preview-icon bg-dark rounded-circle p-1 fs-4">
                                                <i  className="mdi mdi-plus-box text-primary px-2"></i>
                                            </button>
                                        </div>
                                            <InputEmoji 
                                            value={newMessage}
                                            onChange={handleChange}                                              
                                            />
                                        <div className="">
                                            {newMessage === "" ? null :<button onClick={handleSend} type="button" style={{cursor: "pointer", border: "none"}} className="preview-icon bg-dark rounded-circle p-1 fs-4">
                                                <i style={{paddingLeft: "7px", paddingRight: "3px"}} className="mdi mdi-send text-success"></i>
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </form> */}
            </div>
                </> : null
            }
        {/* message input content start */}
        </div>
    </div>
  )
}

export default Chat