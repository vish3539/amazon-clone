import React from "react";
import "./HomeStyle.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Bollywood/1500x600_Hero-Tall_np_bolly._CB405289994_.jpg"
        />

        <div className="home__row">
          {/* Product */}
          <Product
            title="the Lean Startup"
            id={12344}
            price="19.99"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
          {/* Product */}
          <Product
            title="Mixer for your comfor. Blends smootly with 7 blade feature and gives out a great performance + Quality"
            id={12894}
            price="300.99"
            image="https://images-na.ssl-images-amazon.com/images/I/71zrQU%2ByLvL._AC_SX522_.jpg"
            rating={3}
          />
        </div>

        <div className="home__row">
          {/* Product */}
          <Product
            title="Washing Machine"
            id={122384}
            price="300.99"
            image= 'https://m.media-amazon.com/images/I/614-yYoVkUL._AC_UY218_.jpg'
            rating={3}
          />
          {/* Product */}
          <Product
            title="Washing Machine with power drive technology, useful for guys who cleans their clothes every once a blue moon"
            id={132384}
            price="300.99"
            image= 'https://m.media-amazon.com/images/I/81Qqj2C2RzL._AC_UY218_.jpg'
            rating={3}
          />
          {/* Product */}
          <Product
            title="Water Purifier- Purifies the water and kills 99.99% germs and the rest 0.01% of the germs can cause illness"
            id={222394}
            price="300.99"
            image= 'https://m.media-amazon.com/images/I/61wJrW3qb8L._AC_UL320_.jpg'
            rating={3}
          />
        </div>

        <div className="home__row">
          {/* Product */}
          <Product
            title="Wide Screen monitor"
            id={222394}
            price="300.99"
            image= 'https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SX679_.jpg'
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
