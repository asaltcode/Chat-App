import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, login } from '../../../Redux/Actions/UserActions';
import { toast } from 'react-toastify';
import Loading from "../../../animation/Loading"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)
    const formik = useFormik({
        initialValues: {
          email: "",
          password : "",
        },
        validationSchema: Yup.object({
          email: Yup.string()
              .email('Invalid email')
              .matches(
                /^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
                'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail'
              )
              .required('Email is Required'),
          password: Yup.string().required('Password is Required'),
        }),
        onSubmit: async (values) =>{
            console.log(values)
          const {email, password} = values
          dispatch(login(email, password))
         
        //   dispatch(login(email, password))
         
        }
      })
      useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }
        if(error){
          toast(error, {
            type: "error",
            onOpen: ()=> dispatch(clearAuthError)
          })
          return
        }
      },[isAuthenticated, error, dispatch, navigate])
  return (<>
 {loading && <Loading/>}
    <div className="container-scroller bg-image">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="row w-100 m-0">
            <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                <div className="card col-lg-4 col-sm-9 col-11 mx-auto rounded-4">
                    <div className="card-body px-4 py-5">                        
                        <h3 className="card-title m-0"> <span className='pointer text-light' onClick={()=> navigate("/")} ><i className='mdi mdi-arrow-left'></i></span></h3>
                        <h3 className="card-title mb-3  text-center ">Login</h3>                       
                        <form onSubmit={formik.handleSubmit} >
                            <div className="form-group">
                                <label className='text-light' >Username or email <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control text-light p_input" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                                {formik.errors.email && formik.touched.email ? <div className="errorMes text-start">{formik.errors.email}</div>: null}
                            </div>
                            <div className="form-group">
                                <label className='text-light' >Password <span className='text-danger'>*</span></label>
                                <input type="password" className="form-control p_input text-light" name="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} />
                                {formik.errors.password && formik.touched.password ? <div className="errorMes text-start">{formik.errors.password}</div>: null}
                            </div>
                            <div className="form-group d-flex align-items-center justify-content-between">
                                <Link to={"/reset/password"} className="forgot-pass">Forgot password</Link>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-block enter-btn">Login</button>                           
                            </div>
                           
                            <p className="sign-up text-light">Don't have an Account?<Link to={"/register"}> Sign Up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
        </div>
        {/* row ends */}
    </div>
    {/* page-body-wrapper ends */}
</div>
</>);
};

export default Login;
