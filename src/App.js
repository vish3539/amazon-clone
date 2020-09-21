import React, {useEffect} from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckOut from "./CheckOut";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const[{},dispatch ] = useStateValue()
  //USEEFFECT_ its only going to run once when the app component loads.
  useEffect(() => {
    // as soon as the app loads we attach this listener
    auth.onAuthStateChanged(authUser=>{
      console.log('The User is >>>', authUser);

      if(authUser){
        // the user just logged in / the user was logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
   
  }, [])

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
