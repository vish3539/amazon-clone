import React from 'react';
import './CheckoutStyle.css'
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from "./StateProvider";

function CheckOut() {
    const [{basket, user},dispatch]=useStateValue();
    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout_ad' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'/>
                <div>
                    <h2 className='checkout_title'>{ user ?`Hello ${user.email.slice(0, user.email.indexOf("@"))}, ` :'Hello Guest, '}Your Shopping Basket</h2>
                    {/* BasketItem */}
                    {basket.map(item=>(
                        <CheckoutProduct 
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        rating={item.rating} />
                    ))}
                    
                    {/* BasketItem */}
                    {/* BasketItem */}
                </div>
            </div>

            <div className='checkout__right'>
                <Subtotal/>
            </div>
        </div>
    )
}

export default CheckOut;
