package com.mart.payment.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.mart.payment.entity.ApiResponse;
import com.mart.payment.entity.PaymentDetails;
import com.mart.payment.entity.PriceModel;
import com.mart.payment.entity.UserModel;
import com.mart.payment.repository.PaymentRepository;
import com.mart.payment.response.PaymentLinkResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {
	
	String apiKey = "rzp_test_DoENX311Vo5QIJ";
	
	String apiSecret = "jXks6dtRSojJKPHJ9tHZuwgW";
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	public HttpEntity<Void> createRequestEntityWithJwt(String jwt) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", jwt); // Assuming JWT format is "Bearer <token>"
	    return new HttpEntity<>(headers);
	}
	
	@PostMapping("/payments/{addrsId}")
	public ResponseEntity<PaymentLinkResponse>createPaymentLink(@RequestHeader("Authorization") String jwt, @PathVariable Long addrsId) throws Exception {
		
//		Order order=orderService.findOrderById(orderId);
		 try {
		      // Instantiate a Razorpay client with your key ID and secret
//		      RazorpayClient razorpay = new RazorpayClient("rzp_test_kTsRSaDC8hwztX", "LieoD1s9mxMIv569PcgRDMcU");
		      RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
		      
		      //getting user details from user-service
		      UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
		      String email = user.getEmail();
		      if(email.isBlank()) {
		    	throw new Exception("there is no email associate with provided jwt");
		      }
		      
		      PriceModel priceModel = restTemplate.exchange("http://localhost:8086/ord/getPrice", HttpMethod.GET, createRequestEntityWithJwt(jwt), PriceModel.class).getBody();
				

		      // Create a JSON object with the payment link request parameters
		      JSONObject paymentLinkRequest = new JSONObject();
		      
		      paymentLinkRequest.put("amount",priceModel.getTotalPrice()*100);
		      paymentLinkRequest.put("currency","INR");    
		     

		      // Create a JSON object with the customer details
		      JSONObject customer = new JSONObject();
		      customer.put("name",user.getFirstName() +  user.getLastName());
		      customer.put("contact",user.getPhoneNumber());
		      customer.put("email",email);
		      paymentLinkRequest.put("customer",customer);

		      // Create a JSON object with the notification settings
		      JSONObject notify = new JSONObject();
		      notify.put("sms",true);
		      notify.put("email",true);
		      paymentLinkRequest.put("notify",notify);

		      // Set the reminder settings
		      paymentLinkRequest.put("reminder_enable",true);

		      // Set the callback URL and method
//		      paymentLinkRequest.put("callback_url","https://shopwithzosh.vercel.app/payment/"+orderId);
		      paymentLinkRequest.put("callback_url","http://localhost:3000/payment?addrsId="+addrsId);
		      paymentLinkRequest.put("callback_method","get");

		      // Create the payment link using the paymentLink.create() method
		      PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
		      
		      String paymentLinkId = payment.get("id");
		      String paymentLinkUrl = payment.get("short_url");
		      
//		      PaymentLinkResponse res=new PaymentLinkResponse(paymentLinkUrl,paymentLinkId);
//		      
//		      PaymentLink fetchedPayment = razorpay.paymentLink.fetch(paymentLinkId);
//		      
//		      order.setOrderId(fetchedPayment.get("order_id"));
//		      orderRepository.save(order);
//		      
//		   // Print the payment link ID and URL
//		      System.out.println("Payment link ID: " + paymentLinkId);
//		      System.out.println("Payment link URL: " + paymentLinkUrl);
//		      System.out.println("Order Id : "+fetchedPayment.get("order_id")+fetchedPayment);
//		      
//		      Thread.sleep(5000); // Wait for 5 seconds
//		      PaymentLink fetchedPayment = razorpay.paymentLink.fetch(paymentLinkId);
		      
		      PaymentLinkResponse res=new PaymentLinkResponse();
		      res.setPayment_link_id(paymentLinkId);
		      res.setPayment_link_url(paymentLinkUrl);
		      
		      
		      return new ResponseEntity<PaymentLinkResponse>(res,HttpStatus.ACCEPTED);
		      
		    } catch (RazorpayException e) {
		    	
		      System.out.println("Error creating payment link: " + e.getMessage());
		      throw new RazorpayException(e.getMessage());
		    }
	}
	
  @GetMapping("/payments")
  public ResponseEntity<ApiResponse> redirect(@RequestHeader("Authorization") String jwt, @RequestParam(name="payment_id") String paymentId) throws Exception {
//	  RazorpayClient razorpay = new RazorpayClient("rzp_test_kTsRSaDC8hwztX", "LieoD1s9mxMIv569PcgRDMcU");
	  RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
	  
	  UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
      String email = user.getEmail();
      if(email.isBlank()) {
    	throw new Exception("there is no email associate with provided jwt");
      }
	  
	
	  try {
		
			PaymentDetails paymentDetails = new PaymentDetails();
			
			paymentDetails.setEmail(email);
			paymentDetails.setPaymentId(paymentId);
			
			paymentRepository.save(paymentDetails);
			
		  
//			order.getPaymentDetails().setPaymentId(paymentId);
////			order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
//			order.getPaymentDetails().setStatus("COMPLETED");
////			order.setOrderStatus(OrderStatus.PLACED);
//			order.setOrderStatus("PLACED");
////			order.setOrderItems(order.getOrderItems());
////			System.out.println(order.getPaymentDetails().getStatus()+"payment status ");
//			orderRepository.save(order);
//		}
		
		  ApiResponse res=new ApiResponse("your order get placed", true);
			
//		  res.setMessage("your order get placed");
//		  res.setStatus(true);
	      return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
	      
	} catch (Exception e) {

//		new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
		throw new RazorpayException(e.getMessage());
	}

  }
}
