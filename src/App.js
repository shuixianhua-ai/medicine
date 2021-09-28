import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage from "./MainPage/MainPage";
import BBS from './bbs/BBS'
import PostDetail from "./bbs/PostDetail";
import Artical from "./Artical/index";
import AdminContent from "./admin/AdminContent";
import Prescription from "./prescrib/Prescrib";
import Prescription_all from "./prescrib/prescription_all"
import Prescription_detail from "./prescrib/prescription_detail"


import './assets/css/MainPage.css'

var storage = window.localStorage;

class App extends Component{
  render() {
    storage.setItem("TopBarKey","首页");
    return(
        <div className='App'>
          <BrowserRouter>
				<Switch>
					<Route exact path = "/" component = {MainPage}/>
					<Route exact path = '/bbs' component={BBS}/>
					<Route exact path = '/post/:id' component={PostDetail}/>
          <Route exact path = '/prescription_all' component={Prescription_all}/>
          <Route exact path = '/prescription/:id' component={Prescription_detail}/>
          
          
          <Route exact path = '/prescrib' component={Prescription}/>
					<Route path = '/artical' component={Artical}/>
                    <Route path = "/admin" component={AdminContent}/>
				</Switch>
          </BrowserRouter>
        </div>
    )
  }
}
export default App;
