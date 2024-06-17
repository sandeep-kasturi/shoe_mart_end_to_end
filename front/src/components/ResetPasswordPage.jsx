import React, { useState } from 'react'
import Validation from './Validation';
import { useDispatch } from 'react-redux';
import { reset } from '../redux/userRedux/Action';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {

    const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate:(values) => {
        let errors = {};
        if (!values.email || !emailRegex.test(values.email) ) {
          errors.email = "E-mail should be in correct format";
        }
        return errors;
      },
      onSubmit:(values) => {
        console.log("form submit",values);
        dispatch(reset(values.email)).then(()=>{navigate("/login")});
      }
    
    })

    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter your E-mail to reset the password !
              </h2>
            </div>
    
            <div  className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form autoComplete='off' onSubmit={formik.handleSubmit} className="space-y-6" >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      autoComplete="email"
                      // required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.email}</p> : null}
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send
                  </button>
                </div> 
              </form>
            </div>
          </div>
        </>
      )
}

export default ResetPasswordPage
