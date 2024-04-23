import React, { useEffect } from "react";
import animationData from "./json/chatAnimation.json";
import Lottie from "lottie-web";

const ChatAnimation = () => {
  useEffect(() => {
    const container = document.getElementById("animation-containe");
    Lottie.loadAnimation({
      container,
      animationData,
      renderer: "svg", //or 'canvas'
      loop: true,
      autoplay: true,
    });
  }, []);

  return <>
   <div className="d-flex justify-content-center align-items-center h-100">
     <div id="animation-containe" className='overflow-hidden' style={{height: '400px', width: '400px'}}></div>
   </div>
  </>
};

export default ChatAnimation;