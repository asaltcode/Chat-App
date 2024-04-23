import React, { useState } from 'react'
// import Logo_mini from '../../../assets/images/logo-mini.svg'
// import Logo from '../../../assets/images/logo.svg'
import Profile from "../../../public/defaultProfile.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions/UserActions'

// import { logout } from '../../../Redux/Actions/UserActions'
// import '../assets/css/style.css'

const Topbar = ({sideToggle, setSideToggle, activeSideToggle, setActiveSideToggle, profileShow, setProfileShow}) => {
  const Logo = "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg"
  const Logo_mini = "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg"

  const dispatch = useDispatch()
  const {user, isAuthenticated} = useSelector(state => state.authState)
  const navigate = useNavigate()
  const UserName = localStorage.getItem('name')
  // const [profileShow, setProfileShow] = useState("")
  const PofileView = () => profileShow === "" ? setProfileShow('show') : setProfileShow("")
  const handleLogout = () =>{   
    dispatch(logout);
    navigate("/login")
    }
  const handleHome = () =>{navigate("/")}
  return (
   
    <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <a className="navbar-brand brand-logo-mini" onClick={()=>navigate('/admin')}><img src={Logo_mini} alt="logo" /></a>
          </div>
          <div onClick={profileShow === 'show' ? ()=>setProfileShow("") : null}  className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button className="navbar-toggler navbar-toggler align-self-center" onClick={()=> sideToggle === "" ? setSideToggle("sidebar-icon-only"): setSideToggle("")} type="button" data-toggle="minimize">
              <span className="mdi mdi-menu"></span>
            </button>
            <ul className="navbar-nav w-100">
              <li className="nav-item w-100">
               <h2 className=' fw-bold text-center'>Asalt Chat <i className='mdi mdi-facebook-messenger'></i></h2>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              {/* <li className="nav-item dropdown d-none d-lg-block">
                <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown" aria-expanded="false" href="#">+ Create New Project</a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
                  <h6 className="p-3 mb-0">Projects</h6>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-file-outline text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">Software Development</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-web text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">UI Development</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-layers text-danger"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">Software Testing</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <p className="p-3 mb-0 text-center">See all projects</p>
                </div>
              </li> */}
              {/* <li className="nav-item nav-settings d-none d-lg-block">
                <a className="nav-link" href="#">
                  <i className="mdi mdi-view-grid"></i>
                </a>
              </li> */}
              {!isAuthenticated ? null :<>
              <li className="nav-item dropdown border-left">
                <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-email"></i>
                  <span className="count bg-success"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                  <h6 className="p-3 mb-0">Messages</h6>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="assets/images/faces/face4.jpg" alt="image" className="rounded-circle profile-pic"/>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">Mark send you a message</p>
                      <p className="text-muted mb-0"> 1 Minutes ago </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="assets/images/faces/face2.jpg" alt="image" className="rounded-circle profile-pic"/>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">Cregh send you a message</p>
                      <p className="text-muted mb-0"> 15 Minutes ago </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="assets/images/faces/face3.jpg" alt="image" className="rounded-circle profile-pic"/>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">Profile picture updated</p>
                      <p className="text-muted mb-0"> 18 Minutes ago </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <p className="p-3 mb-0 text-center">4 new messages</p>
                </div>
              </li>
              <li className="nav-item dropdown border-left">
                <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                  <i className="mdi mdi-bell"></i>
                  <span className="count bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                  <h6 className="p-3 mb-0">Notifications</h6>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">Event today</p>
                      <p className="text-muted ellipsis mb-0"> Just a reminder that you have an event today </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-danger"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">Settings</p>
                      <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-link-variant text-warning"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">Launch Admin</p>
                      <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <p className="p-3 mb-0 text-center">See all notifications</p>
                </div>
              </li>
              <li className={`nav-item dropdown  ${profileShow}`} onClick={PofileView} >
                <a className="nav-link" id="profileDropdown" href="#" aria-expanded={profileShow === 'show'? true : false} data-toggle="dropdown">
                  <div className="navbar-profile">
                    <img className="img-xs rounded-circle object-fit-cover" src={user?.avatar ? user.avatar : Profile} alt=""/>
                    <p className="mb-0 d-none text-light d-sm-block navbar-profile-name">{UserName}</p>
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                  </div>
                </a>
                <div className={`dropdown-menu dropdown-menu-right bg-dark text-light navbar-dropdown preview-list ${profileShow}`} aria-labelledby="profileDropdown">
                  <h6 className="p-3 mb-0">Profile</h6>
                  <div className="dropdown-divider bg-secondary"></div>
                  <Link to={"/edit"} className="dropdown-item preview-item bg-dark text-light list-group-item list-group-item-action ">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">Profile</p>
                    </div>
                  </Link>
                  <div className="dropdown-divider bg-secondary"></div>
                  <a onClick={handleLogout} className="dropdown-item preview-item bg-dark text-light list-group-item list-group-item-action list-group-item-dark ">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger"></i>
                      </div>
                    </div>
                    <div className="preview-item-content ">
                      <p className="preview-subject mb-1">Log out</p>
                    </div>
                  </a>
                  <div className="dropdown-divider bg-secondary"></div>
                 
                  <p className="p-3 mb-0 text-center">Advanced settings</p>
                </div>
              </li>
              </>}
             {isAuthenticated ? null : <li>
                <button className='btn btn-primary' onClick={() => navigate("/login")}>Login</button>
              </li>}
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" onClick={()=> activeSideToggle === "" ? setActiveSideToggle("active") : setActiveSideToggle("")} type="button" data-toggle="offcanvas">
              <span className="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
 
  )
}

export default Topbar