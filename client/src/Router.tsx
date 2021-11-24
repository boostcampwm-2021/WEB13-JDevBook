import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userDataStates, isLoginfailStates } from 'recoil/store';

import {
  GroupPage,
  HomePage,
  LoginPage,
  ProfilePage,
  IsLoginPage,
  GroupSelectPage
} from 'pages';
import { ChatSideBar, AlarmSideBar } from 'components/common';

const Router = () => {
  const [login, setLogin] = useState(false);
  const [loginfail, setLoginfail] = useRecoilState(isLoginfailStates);
  const userdata = useRecoilValue(userDataStates);
  useEffect(() => {
    if (userdata.login === false) {
      // 새로고침해도 default가 false라 상관X, 로그인직후 userdata 변경시 막기용
      (async () => {
        const isloginRes: Response = await fetch('/api/islogin');
        const islogin: boolean = await isloginRes.json();
        setLogin(islogin);
        if (islogin === false) setLoginfail(true);
      })();
    }
  }, [userdata]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route
          path="/home"
          exact
          render={() => (login ? <HomePage /> : <IsLoginPage />)}
        />
        <Route
          path="/groupselect"
          exact
          render={() => (login ? <GroupSelectPage /> : <IsLoginPage />)}
        />
        <Route
          path="/group/:groupidx"
          exact
          render={(props) =>
            login ? <GroupPage {...props} /> : <IsLoginPage />
          }
        />
        <Route
          path="/profile/:username"
          exact
          render={(props) =>
            login ? <ProfilePage {...props} /> : <IsLoginPage />
          }
        />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
      <ChatSideBar />
      <AlarmSideBar />
    </BrowserRouter>
  );
};

const NotFoundPage = () => {
  return <h2>404 Not Found Page</h2>;
};

export default Router;
