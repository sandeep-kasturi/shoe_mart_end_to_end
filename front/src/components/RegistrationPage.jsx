import React, { useEffect } from 'react'
import { useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './Validation';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/userRedux/Action';
import { useFormik } from 'formik';

const RegistrationPage = () => {

    const [agreed, setAgreed] = useState(false);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    // const {user} = useSelector(store=>store); 
    const navigate = useNavigate();  
    const dispatch = useDispatch();
    const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
      },
      onSubmit: (values) => {
        console.log("form data: ", values)
        dispatch(register(values)).then(()=>{navigate('/login')});
        console.log("dispatch cmplt");
      },
      validate: (values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Required';
        }
        if (!values.lastName) {
          errors.lastName = 'Required';
        }
        if (!values.phoneNumber || values.phoneNumber.length<10) {
          errors.phoneNumber = 'Required and must be 10 digits long';
        }
        if (!values.email || !emailRegex.test(values.email)) {
          errors.email = 'Required and must be a valid email address';
        }
        if (!values.password || !passwordRegex.test(values.password)) {
          errors.password = 'Required and must be 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special';
        }
        return errors;
      }
    })


    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Let's Register!</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Join our community and enjoy our services.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <form onSubmit={formik.handleSubmit} autoComplete='off' className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.firstName ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.firstName}</p> : null}
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.lastName ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.lastName}</p> : null}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="organization"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.phoneNumber ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.phoneNumber}</p> : null}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.email ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.email}</p> : null}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="email"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.password ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.password}</p> : null}
                </div>
              </div>
              <Field as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-indigo-600' : 'bg-gray-200',
                      'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <Label className="text-sm leading-6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </a>
                  .
                </Label>
              </Field>

              <div className="mt-10 ">
              <button
                type='submit'
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
              <div className="text-sm leading-6 text-gray-600 pt-5">
                  If you already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600">
                    &nbsp;Login
                  </Link>
                  .
                </div>
              </div>
            
          </form>
          </div>
        </div>
      )
}

export default RegistrationPage
