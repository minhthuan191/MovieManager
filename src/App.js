
import './App.css';
import Movie from "./components/movies";
import {Route, Redirect, Switch} from "react-router-dom";
import React, { Component } from 'react';
import Customers from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';


function App() {
  return (
    <React.Fragment>
    <NavBar></NavBar>
    <main className="container">
      <Switch>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" component={Movie}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies"/>
        <Redirect to="/not-found"/> 
      </Switch>
    </main>
    </React.Fragment>
  );
}

export default App;
