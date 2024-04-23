import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, signup } from '../../../Redux/Actions/UserActions';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)
    const cap = text => text.trim().toUpperCase() + text.slice(1).toLowerCase()
    let formik = useFormik({ //Formik Validations
        initialValues: {
          username: "",
          email: "",
          password: "",
        },
        validationSchema: Yup.object({
          username:Yup.string().required('Name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
          email: Yup.string().email('Invalid email address').matches(/^(.+)@(?!sparet\.com)(gmail\.com|outlook\.com|yahoo\.com|zoho\.com)$/,
          'Email must be from Gmail, Outlook, Yahoo Mail, or Zoho Mail').required('Email is required'),
          password: Yup.string()
              .matches(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
              .matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
              .matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
              .matches(/^(?=.*[!@#$%^&*()_+])/, { message: 'Password must contain at least one special character' })
              .min(6, 'Password must be at least 6 characters long')
              .required('Password is required'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
          const {username, email, password} = values
          const userData = {username, email, password}
          dispatch(signup(userData))    

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
  return (
    <div className="container-scroller bg-image">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="row w-100 my-3">
                <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 col-sm-9 col-11 mx-auto rounded-4">
                        <div className="card-body px-4 py-5">            
                            <h3 className="card-title m-0"> <span className='pointer text-light' onClick={()=> navigate("/")} ><i className='mdi mdi-arrow-left'></i></span></h3>              
                            <h3 className="card-title text-center">Sign Up</h3>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <label className="text-light" htmlFor='name'>Username</label>
                                    <input type="text" id='name' className="text-light form-control p_input" name="username" onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange} />
                                    {formik.touched.username && formik.errors.username ? (<div className="errorMes">{formik.errors.username}</div>) : null}
                                </div>
                                <div className="form-group">
                                    <label className="text-light" htmlFor='email'>Email</label>
                                    <input type="email" id='email' className="text-light form-control p_input" name="email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
                                    {formik.touched.email && formik.errors.email ? (<div className="errorMes">{formik.errors.email}</div>) : null}
                                </div>
                                <div className="form-group">
                                    <label className="text-light" htmlFor='password'>Password</label>
                                    <input type="password" className="text-light form-control p_input" name="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} />
                                    {formik.touched.password && formik.errors.password ? (<div className="errorMes">{formik.errors.password}</div>) : null}
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-between">
                                    <Link to={"/reset/password"} className="forgot-pass">Forgot password</Link>
                                </div>
                                <div className="text-center">
                                    <button type="submit"className="btn btn-primary btn-block enter-btn">Register</button>
                                </div>                                
                                <p className="sign-up text-center text-light">Already have an Account?<Link to={"/login"}> Login</Link></p>
                                <p className="terms text-light">By creating an account you are accepting our<a href="#"> Terms &
                                        Conditions</a></p>
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
  );
};

export default Register;
