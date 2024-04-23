import React, { useState } from 'react'
import Logo from '../../assets/logo.svg';
// import Logo_mini from '../../../assets/images/logo-mini.svg';
import Profile from '../../../public/defaultProfile.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Sidebar = ({activeSideToggle, setActiveSideToggle, profileDropDown, setProfileDropDown, profileStyle, setProfileStyle}) => {

//   const Logo = "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg"
  const Logo_mini = "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg"
//   const Profile = "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg"
  const {user, isAuthenticated} = useSelector(state => state.authState)
//   const  user ={}
  const location = useLocation()
  const navigate = useNavigate()
  const UserName = localStorage.getItem('name');
  const styles = {position: "absolute", transform: "translate3d(53px, 43px, 0px)", top: "0px", left: "0px", willChange: "transform"}
 
  const handleProfileDropDown = () =>{
       profileDropDown === "" ? (setProfileDropDown("show"), setProfileStyle(styles), setActiveSideToggle("active")) : (setProfileDropDown(""), setProfileStyle({}))
    // alert("hi")
  }
  return (
    <nav className={`sidebar sidebar-offcanvas ${activeSideToggle}`} id="sidebar">
        <div onClick={()=>navigate("/admin")} className="sidebar-brand-wrapper d-none d-lg-flex align-items-center
            justify-content-center fixed-top">
            <a style={{cursor: "pointer" }} className="sidebar-brand brand-logo"><img src={Logo} alt="logo" /></a>
            <a style={{cursor: "pointer" }} className="sidebar-brand brand-logo-mini"><img src={Logo_mini}
                    alt="logo" /></a>
        </div>
        <ul className="nav">
{   !isAuthenticated ? null : <li className="nav-item profile">
                    <div className={`profile-desc ${profileDropDown}`}>
                        <div className="profile-pic">
                            <div className="count-indicator">
                                <img className="img-xs rounded-circle object-fit-cover" src={user?.avatar ? user.avatar : Profile} alt="" />
                                <span className="count bg-success"></span>
                            </div>
                            <div className="profile-name">
                                <h5 className="mb-0 font-weight-normal text-light">{UserName}</h5>
                                <span>Gold Member</span>
                            </div>
                        </div>
                        <a href="#" id="profile-dropdown" onClick={handleProfileDropDown}
                            aria-expanded={profileDropDown==="show" ? true : false} data-toggle="dropdown"><i
                                className="mdi mdi-dots-vertical"></i></a>
                        <div className={`dropdown-menu dropdown-menu-right sidebar-dropdown preview-list
                            ${profileDropDown}`} style={profileStyle} aria-labelledby="profile-dropdown">
                            <a href="#" className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-dark rounded-circle">
                                        <i className="mdi mdi-settings text-primary"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-dark rounded-circle">
                                        <i className="mdi mdi-onepassword  text-info"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-dark rounded-circle">
                                        <i className="mdi mdi-calendar-today text-success"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                                </div>
                            </a>
                        </div>
                    </div>
            </li>}

            <li className="nav-item nav-category">
                <span className="nav-link">Navigation</span>
            </li>
            <li className={`nav-item menu-items pointer ${location.pathname==="/" ?"active" : "" }`}>
                <a className="nav-link" onClick={()=>navigate('/')}>
                    <span className="menu-icon">
                        <i className="mdi mdi-collage text-primary"></i>
                    </span>
                    <span className="menu-title">Dashboard</span>
                </a>
            </li>
            <li className={`nav-item menu-items d-md-none pointer ${location.pathname.includes('/friends') ?"active"
                : "" }`} title='Friends'>
                <a className="nav-link" data-toggle="collapse" onClick={()=>navigate('/friends')} aria-expanded="false"
                    aria-controls="auth">
                    <span className="menu-icon">
                        <i className="mdi mdi-account-multiple-outline"></i>
                    </span>
                    <span className="menu-title">Friends</span>
                </a>
            </li>
            <li title='Chat' className={`nav-item menu-items pointer d-md-block d-sm-none d-none
                ${location.pathname.includes('/chat') ?"active" : "" }`}>
                <a className="nav-link" data-toggle="collapse" onClick={()=>navigate('/chat')} aria-expanded="false"
                    aria-controls="ui-basic">
                    <span className="menu-icon">
                        <i className="mdi mdi-message-reply-text"></i>
                    </span>
                    <span className="menu-title">Chat</span>
                </a>
            </li>
            {/* <li className={`nav-item menu-items pointer ${location.pathname.includes("/admin/course") ?"active" : ""
                }`}>
                <a className="nav-link" onClick={()=> navigate('/admin/course')}>
                    <span className="menu-icon">
                        <i className="mdi mdi-book-open-page-variant"></i>
                    </span>
                    <span className="menu-title">Course</span>
                </a>
            </li>
            <li style={{cursor: "pointer" }} className={`nav-item menu-items
                ${location.pathname.includes("/admin/add-course") ?"active" : "" }`}>
                <a className="nav-link" onClick={()=> navigate('/admin/add-course')}>
                    <span className="menu-icon">
                        <i className="mdi mdi-table-large"></i>
                    </span>
                    <span className="menu-title">Add Courese</span>
                </a>
            </li>
            <li style={{cursor: "pointer" }} className={`nav-item menu-items
                ${location.pathname.includes("/admin/syllabus") ?"active" : "" }`}>
                <a className="nav-link" onClick={()=> navigate('/admin/syllabus')}>
                    <span className="menu-icon">
                        <i className="mdi mdi-chart-bar"></i>
                    </span>
                    <span className="menu-title">View Syllabus</span>
                </a>
            </li>
            <li style={{cursor: "pointer" }} className={`nav-item menu-items`}>
                <a className="nav-link" href="pages/icons/mdi.html">
                    <span className="menu-icon">
                        <i className="mdi mdi-contacts"></i>
                    </span>
                    <span className="menu-title">Icons</span>
                </a>
            </li> */}

        </ul>
    </nav>
  )
}

export default Sidebar