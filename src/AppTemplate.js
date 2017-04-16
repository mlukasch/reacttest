import React from "react";
import AppReduxPromisePage from './pages/AppReduxPromise';
import AppReduxThunkPage from './pages/AppReduxThunk';
import AppReduxSagaPage from './pages/AppReduxSaga';
import HomePage from './pages/Home';
import WeatherPage from './pages/Weather';
import {BrowserRouter, Link} from "react-router-dom";
import {Route} from "react-router";

const Navigation = () =>
    (<div>
        <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/redux-promise">Redux Promise Page</Link></li>
            <li><Link to="/redux-thunk">Redux Thunk Page</Link></li>
            <li><Link to="/redux-saga">Redux Saga Page</Link></li>
            <li><Link to="/weather">Wetter Page</Link></li>
        </ul>
        <hr />
    </div>)

export default () =>
    (<BrowserRouter>
        <div>
            <Navigation />
            <Route exact path="/" component={HomePage}/>
            <Route path="/weather/:id" component={WeatherPage}/>
            <Route path="/redux-promise" component={AppReduxPromisePage}/>
            <Route path="/redux-thunk" component={AppReduxThunkPage}/>
            <Route path="/redux-saga" component={AppReduxSagaPage}/>
        </div>
    </BrowserRouter>)




