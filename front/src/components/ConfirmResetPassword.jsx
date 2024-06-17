import React, { useState } from 'react'
import Validation from './Validation';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmReset } from '../redux/userRedux/Action';
import { useFormik } from 'formik';

const ConfirmResetPassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const decodedQueryString = decodeURIComponent(location.search);					
    const searchParams = new URLSearchParams(decodedQueryString);						
    const token = searchParams.get("token");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const formik = useFormik({
      initialValues: {
        newPassword: '',
        retypeNewPassword: ''
      },
      validate:(values) => {
        let errors = {};
        if (!values.newPassword || !passwordRegex.test(values.newPassword) ) {
          errors.newPassword = "Password should be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit";
        }
        if (!values.retypeNewPassword || values.retypeNewPassword !== values.newPassword) {
          errors.retypeNewPassword = "passwords should be same";
        }
        return errors;
      },
      onSubmit:(values) => {
        console.log("form submit",values);
        console.log("token n value : ", token,values);
        dispatch(confirmReset(token,values)).then(()=>{navigate("/login")});
      }
    
    })

    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Set your new password !
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form autoComplete='off' onSubmit={formik.handleSubmit} className="space-y-6" >    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                      Enter New Password
                    </label>
                  </div>
                  
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formik.values.newPassword}
                      autoComplete="current-password"
                      // required
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.newPassword ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.newPassword}</p> : null}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="retypeNewPassword" className="block text-sm font-medium leading-6 text-gray-900">
                      Re-type Password
                    </label>
                  </div>
                  
                  <div className="mt-2">
                    <input
                      id="retypeNewPassword"
                      name="retypeNewPassword"
                      type="Password"
                      value={formik.values.retypeNewPassword}
                      autoComplete="current-password"
                      // required
                      onChange={formik.handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formik.errors.retypeNewPassword ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.retypeNewPassword}</p> : null}
                  </div>

                  <div>
                    <button
                        type='submit'
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Send
                    </button>
                   </div>


                </div>
    
                
              </form>
    

            </div>
          </div>
        </>
      )
}

export default ConfirmResetPassword
