import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const FontAwesome = lazy(() => import('./icons/FontAwesome'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const BlankPage = lazy(() => import('./user-pages/BlankPage'));

const LoginStudent = lazy(() => import('./user-pages/LoginStudent'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route exact path="/basic-ui/buttons" component={ Buttons } />
          <Route exact path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route exact path="/basic-ui/typography" component={ Typography } />

          <Route exact path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route exact path="/tables/basic-table" component={ BasicTable } />

          <Route exact path="/icons/font-awesome" component={ FontAwesome } />

          <Route exact path="/charts/chart-js" component={ ChartJs } />


          <Route exact path="/teacher-login" component={ Login } />
          <Route exact path="/student-login" component={ LoginStudent } />
          <Route exact path="/registration" component={ Register1 } />

          <Route exact path="/user-pages/error-404" component={ Error404 } />
          <Route exact path="/user-pages/error-500" component={ Error500 } />

          <Route exact path="/user-pages/blank-page" component={ BlankPage } />


          <Redirect to="/user-pages/error-404" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;