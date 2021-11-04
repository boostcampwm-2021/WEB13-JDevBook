import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GroupPage, HomePage, LoginPage, ProfilePage } from './pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/group" exact component={GroupPage} />
        <Route path="/profile/:userId" exact component={ProfilePage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const NotFoundPage = () => {
  return <h2>404 Not Found Page</h2>;
};

export default Router;
