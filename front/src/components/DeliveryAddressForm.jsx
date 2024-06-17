import { Box, Button, Grid, TextField, useForkRef } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddressCard from './AddressCard'
import { useFormik } from 'formik'
import { addToAddresss, getAllAddresses } from '../redux-toolkit/address-redux/addressSlice'
// import { addAddress, getAllAddresses } from '../redux/addressRedux/action'

const DeliveryAddressForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const listOfAddress = useSelector(store=>store.addressRedux.listOfAddress);
    const msg = useSelector(store=>store.addressRedux.msg);

    useEffect(() => {
        if(jwt !== null){
            dispatch(getAllAddresses());
        }
    }, [jwt, msg]);


    const pincodeRegex = /^[1-9][0-9]{5}$/;

    const formik = useFormik({
        initialValues : {
            name: '',
            streetName: '',
            district: '',
            state: '',
            pincode: '',
            // email: '',
            phoneNumber: ''
            },
            onSubmit: (values) => {
                console.log("formik address values: ",values);
                dispatch(addToAddresss(values)).then(()=>{
                    alert('address added successfully');
                    // dispatch(getAllAddresses()).then(()=>{alert('address loaded successfully')});
                });
                formik.resetForm();
            },
            validate: (values) => {
                const errors = {};
                // if (!values.email || !emailRegex.test(values.email)) {
                //     errors.email = 'Required and must be a valid email address';
                //   }
                if (!values.phoneNumber || values.phoneNumber.length < 10) {
                    errors.phoneNumber = 'Phone number must be of 10 digits';
                }
                if (!values.name) {
                    errors.name = 'Required';
                }
                if (!values.streetName) {
                    errors.streetName = 'Required';
                }
                if (!values.district) {
                    errors.district = 'Required';
                }
                if (!values.state) {
                    errors.state = 'Required';
                }
                if (!values.pincode || !pincodeRegex.test(values.pincode)) {
                    errors.pincode = 'Required and should be 6 digits';
                }
                return errors;
            }
    })




  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={12} lg={5} className='border rounded-md shadow-md h-[30.5rem] overflow-y-scroll'>
             <div className='p-5 py-7 border-b cursor-pointer'>
                {listOfAddress?.map((item,index) => <AddressCard key={index} item={item} />)}
                 {/* {address && <Button sx={{mt:2,bgcolor:'RGB(145 85 253'}}  size='small' variant='contained' onClick={handleDeliver}>Select to deliver here...</Button>} */}
             </div>
        </Grid>

        <Grid item xs={12} lg={7}>
            <Box className="border rounded-s-md shadow-md p-5">
                <form onSubmit={formik.handleSubmit} autoComplete='off'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="name" name="name" label="Full name" fullWidth autoComplete='given-name' />
                            {formik.errors.name ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.name}</p> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="streetName" name="streetName" label="Street Name" fullWidth autoComplete='given-name'/>
                            {formik.errors.streetName ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.streetName}</p> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="district" name="district" label="District" fullWidth autoComplete='given-name'/>
                            {formik.errors.district ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.district}</p> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="state" name="state" label="State" fullWidth autoComplete='given-name'/>
                            {formik.errors.state ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.state}</p> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="pincode" name="pincode" label="Zip / Postal Code" fullWidth autoComplete='shipping postal-code'/>
                            {formik.errors.pincode ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.pincode}</p> : null}
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="email" name="email" label="E-mail" fullWidth autoComplete='given-name'/>
                            {formik.errors.email ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.email}</p> : null}
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <TextField onChange={formik.handleChange} required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth autoComplete='given-name'/>
                            {formik.errors.phoneNumber ? <p className="mt-1 text-center text-sm text-red-600">{formik.errors.phoneNumber}</p> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button sx={{py:1.5,mt:2,bgcolor:'RGB(145 85 253'}} size='large' variant='contained' type='submit'>Add Address</Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>

        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(DeliveryAddressForm)
