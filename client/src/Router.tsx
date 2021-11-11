import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userData, isLoginfail } from 'recoil/store';
import {
  GroupPage,
  HomePage,
  LoginPage,
  ProfilePage,
  IsLoginPage
} from './pages';

const Router: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [loginfail, setLoginfail] = useRecoilState(isLoginfail);
  const userdata = useRecoilValue(userData);
  useEffect(() => {
    if (userdata.login === false) {
      // 새로고침해도 default가 false라 상관X, 로그인직후 userdata 변경시 막기용
      (async () => {
        const isloginRes: Response = await fetch('api/islogin');
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
          path="/group"
          exact
          render={() => (login ? <GroupPage /> : <IsLoginPage />)}
        />
        /* 위처럼 하면 ProfilePage에 match? 때문에 오류나는듯? */ /*
        ProfilePage에서 타입 바꿨는데 작동이 이상함 */
        <Route path="/profile/:userId" exact component={ProfilePage} />
        {/* <Route
          path="/profile/:userId"
          exact
          render={(props) =>
            login ? <ProfilePage {...props} /> : <IsLoginPage />
          }
        /> */}
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const NotFoundPage = () => {
  return <h2>404 Not Found Page</h2>;
};

export default Router;
