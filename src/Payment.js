import React, { useState, useEffect } from "react";
import "./PaymentStyle.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { calculateBasketTotal } from "./reducer";
import Axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeded, setSucceeded] =useState(false);
  const [processing, setProcessing] =useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const history = useHistory();

  useEffect(()=>{

    // generate the special stripe secret which allows us to charge a cx
    const getClientSecret =  async ()=>{
      const response = await Axios({
        method:'post',
        //stripe expects the total in a currencies subunits (dollar-->cents)
        url:`/payments/create?total=${calculateBasketTotal(basket)*100}`
      });
      setClientSecret(response.data.clientSecret)

    }

    getClientSecret();

  },[basket])

  const handleSubmit = async event => {
    event.preventDefaut();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret,{
      payment_method :{
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      // paymentIntent = payment confirmation.
      setSucceeded(true);
      setError(null);
      setProcessing(false)

      history.replaceState('/orders')
    })
  };

  const handleChange = event => {
    // when we write on the CardElement
    // Listen for changes in the CardElement
    // display any errors as the customer types their card details.
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">{basket.length} items</Link>}</h1>
        {/* payment Section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user ? `${user.email}` : "No email(Guest)"}</p>
            <p>123 Learning React lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* payment Section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment Section - Actual Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic  */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={value => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={calculateBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
