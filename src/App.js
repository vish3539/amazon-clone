import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckOut from "./CheckOut";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HL9vlJwYcjlNMUt2OsqEtzE69sIep5lnSzvJndtD6DoWoFyOy3Vg7XNhCgGDmvmFAc8FCNfYGdWW6z5eIexEBzN009Hf1Qoqn"
);

function App() {
  const [{}, dispatch] = useStateValue();
  //USEEFFECT_ its only going to run once when the app component loads.
  useEffect(() => {
    // as soon as the app loads we attach this listener
    auth.onAuthStateChanged(authUser => {
      console.log("The User is >>>", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <CheckOut />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
