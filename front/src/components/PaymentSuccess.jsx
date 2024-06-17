import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { getAllOrder } from "../redux-toolkit/order-redux/orderSlice";
import { updatePayment } from "../redux-toolkit/payment-redux/paymentSlice";
import OrderTracker from "./OrderTracker";
import AddressCardForOrderSummery from "./AddressCardForOrderSummery";
import { getAddressById } from "../redux-toolkit/address-redux/addressSlice";
import { useParams } from "react-router-dom";


const PaymentSuccess = () => {
  // razorpay_payment_link_reference_id
  // razorpay_payment_id
  const [paymentStatus, setPaymentStatus] = useState("");


  

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
//   const { order } = useSelector((store) => store);
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("razorpay_payment_id").trim();
  const payment_status = urlParams.get("razorpay_payment_link_status").trim();
  console.log("payment_status:",payment_status);

  const addrsId  = urlParams.get("addrsId").trim();
  console.log("addrsId:",addrsId);


//   useEffect(() => {
//     setPaymentId(urlParams.get("razorpay_payment_id").trim());
//     // setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
//     setPaymentStatus(urlParams.get("razorpay_payment_link_status").trim());
//   }, []);

  //useEffect(() => {
    // if (paymentId && paymentStatus === "paid") {
    //   const data = { orderId, paymentId, jwt };
    // const data = { orderId, paymentId};
    //   dispatch(updatePayment(data));
    //   dispatch(getOrderById(orderId));
    // }

//     if(paymentId){
//       const data = { orderId, paymentId};
//       dispatch(updatePayment(data));
//       dispatch(getOrderById(orderId));
//     }
//   }, [orderId, paymentId]);
const listOfOrderItems = useSelector(store=>store.orderRedux.listOfOrderItems);
const address = useSelector(store=>store.addressRedux.address);
// const {addrsId} = useParams();


  useEffect(() => {
    if(paymentId){
        dispatch(getAddressById(addrsId));
        dispatch(getAllOrder());   
        dispatch(updatePayment(paymentId))
    }
  }, [paymentId]);

//   console.log("order data",order.order)

  return (
    <div className="mt-24 px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>

      <OrderTracker activeStep={1}/>

      <Grid container className="space-y-5 py-5 pt-20">
        {listOfOrderItems?.map((item) => (
          <Grid container item className="shadow-xl rounded-md p-5 border" sx={{ alignItems: "center", justifyContent: "space-between" }} >
            <Grid item xs={6}>
              {" "}
              <div className="flex  items-center ">
                <img className="w-[5rem] h-[5rem] object-cover object-top" src={item?.image} alt="reload" />
                <div className="ml-5 space-y-2">
                  <p className="">{item?.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: {item?.color}</span> <span>Size: {item?.size}</span>
                  </p>
                  <p>Seller: {item?.brand}</p>
                  <p>₹{item?.selling_price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCardForOrderSummery item={address} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
