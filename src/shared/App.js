import React from 'react';
import './App.css';
import {Flex} from '../elements'
import { Route } from "react-router";
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Main from '../pages/Main';
const App = () => {

  return (
    <Flex styles={{ height: "100vh"}}>
      <Route path="/" exact component={Main}></Route>
      <Route path="/mypage" exact component={MyPage}></Route>
      <Route path="/login" exact component={Login}></Route>
    </Flex>
  );
}

export default App;
