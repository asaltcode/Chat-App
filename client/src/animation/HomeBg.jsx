import React, { useEffect } from "react";
import animationData from "./json/homeBg.json";
import Lottie from "lottie-web";

const HomeBg = () => {
    useEffect(() => {
        const container = document.getElementById("home-bg");
        Lottie.loadAnimation({
          container,
          animationData,
          renderer: "svg", //or 'canvas'
          loop: true,
          autoplay: true,
        });
      }, []);
      return <>
      <div style={{zIndex: "0", position: "fixed"}} className="">
        <div id="home-bg" className='overflow-hidden' style={{height: '100%', width: '100%'}}></div>
      </div>
     </>
}

export default HomeBg