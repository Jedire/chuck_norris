import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import { connect } from "react-redux";

import Profile from './components/Profile';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home/>}>
          </Route>
          <Route path={`/profile`} element={<Profile/>}>
          </Route>
          <Route path={`*`} element={<Home/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default connect(null, null)(App);
