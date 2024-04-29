import React, { useState } from "react";
import "../../../assets/css/style.css";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../../Global/Topbar";
import Sidebar from "../../Global/Sidebar"
import Error from "../Error";

const Home = () => {
  const location = useLocation()
  const [sideToggle, setSideToggle] = useState("")
  const [activeSideToggle, setActiveSideToggle] = useState("")
  const [profileShow, setProfileShow] = useState("") //topBar profile Drop Down 
  const [profileDropDown, setProfileDropDown] = useState("");//sideBar profile Drop Down 
  const [profileStyle, setProfileStyle] = useState({});
  const handleToggles = () =>{
    // alert("hi")
    profileDropDown === "show" ? setProfileDropDown("") : null
    activeSideToggle === "active"? setActiveSideToggle("") : null
    profileDropDown === "show" ? (setProfileDropDown(""), setProfileStyle({})) : null
    profileShow === "show" ? setProfileShow("") :null
    // profileDropDown === "" ? (setProfileDropDown("show"), setProfileStyle(styles)) : (setProfileDropDown(""), setProfileStyle({}))
  }
 

  return (
    <>
    <Error/>
    <div onClick={handleToggles} className={`dashboar_container ${sideToggle}`}>
        <div className="container-scroller">
            <Sidebar activeSideToggle={activeSideToggle} setActiveSideToggle={setActiveSideToggle} profileDropDown={profileDropDown} setProfileDropDown={setProfileDropDown} profileStyle={profileStyle} setProfileStyle={setProfileStyle} />
            <div className="container-fluid p-0 page-body-wrapper">
                <Topbar sideToggle={sideToggle} setSideToggle={setSideToggle} activeSideToggle={activeSideToggle} setActiveSideToggle={setActiveSideToggle} profileShow={profileShow} setProfileShow={setProfileShow} />
                <div  className="main-panel ">
                    <div className="content-wrapper overflow-hidden position-relative">    
                       {/* <ChatAnimation/>                     */}
                        {/* {
                          location.pathname.includes("/")  && <HomeContent/>
                        } */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Home;